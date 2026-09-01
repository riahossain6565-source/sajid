import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  User
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { Product, CartItem, Order, Review, PageType, AdminTab, UserProfile } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS } from '../data/products';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Navigation
  currentPage: PageType;
  navigateTo: (page: PageType, productId?: string) => void;
  selectedProductId: string | null;
  selectedProduct: Product | undefined;
  
  // Customer Authentication (Firebase Auth)
  currentUser: User | null;
  userProfile: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  registerWithEmail: (name: string, email: string, pass: string, phone?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginAsDemoCustomer: () => Promise<boolean>;
  logoutUser: () => Promise<void>;
  updateUserProfileData: (data: Partial<UserProfile>) => Promise<void>;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, sizeWeight: string, quantity?: number) => void;
  removeFromCart: (productId: string, sizeWeight: string) => void;
  updateQuantity: (productId: string, sizeWeight: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  // Products Management
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => Promise<void>;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  lastOrder: Order | null;
  
  // WhatsApp Integration
  whatsappNumber: string;
  setWhatsappNumber: (num: string) => void;
  generateWhatsAppUrl: (message: string) => string;
  orderViaWhatsApp: (product: Product, size: string, quantity: number, address?: string) => void;
  checkoutCartViaWhatsApp: (orderDetails: { name: string; phone: string; address: string; notes?: string }) => Promise<void>;
  
  // Admin Authentication
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  
  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Search & Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedConcern: string;
  setSelectedConcern: (c: string) => void;

  // Cloud Firestore Sync State
  isFirestoreConnected: boolean;
  isSyncing: boolean;
  reseedFirestoreData: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('keshaura-organic-hair-pack');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<AdminTab>('orders');
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const initialSeeded = useRef(false);

  // Customer Authentication States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('keshaura_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // Storage for Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('keshaura_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  // Storage for Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('keshaura_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Storage for Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('keshaura_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  // Storage for Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('keshaura_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_REVIEWS;
  });

  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [whatsappNumber, setWhatsappNumberState] = useState<string>(() => {
    const saved = localStorage.getItem('keshaura_whatsapp');
    if (!saved || saved === '919876543210') {
      localStorage.setItem('keshaura_whatsapp', '8801618567449');
      return '8801618567449';
    }
    return saved;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('keshaura_admin_auth') === 'true';
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedConcern, setSelectedConcern] = useState('all');

  // Persistence to localStorage for fast initial render
  useEffect(() => {
    localStorage.setItem('keshaura_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('keshaura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('keshaura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('keshaura_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('keshaura_whatsapp', whatsappNumber);
  }, [whatsappNumber]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('keshaura_user_profile', JSON.stringify(userProfile));
    } else {
      localStorage.removeItem('keshaura_user_profile');
    }
  }, [userProfile]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch or create user profile doc in Firestore
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const data = userSnap.data() as UserProfile;
            setUserProfile(data);
          } else {
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || user.email?.split('@')[0] || 'Ayurveda Seeker',
              photoURL: user.photoURL || null,
              phoneNumber: user.phoneNumber || '',
              address: '',
              city: '',
              postalCode: '',
              dosha: 'Tridoshic'
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (e) {
          console.warn('Error syncing user profile with Firestore:', e);
          if (!userProfile) {
            setUserProfile({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || 'Customer',
              phoneNumber: user.phoneNumber || ''
            });
          }
        }
      } else {
        // Check if demo user is logged in locally
        const demoUser = localStorage.getItem('keshaura_demo_auth');
        if (!demoUser) {
          setUserProfile(null);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Firestore Real-time Subscriptions & Auto-seed
  useEffect(() => {
    let unsubProducts: (() => void) | undefined;
    let unsubOrders: (() => void) | undefined;
    let unsubReviews: (() => void) | undefined;
    let unsubSettings: (() => void) | undefined;

    const setupFirestore = async () => {
      try {
        setIsSyncing(true);

        // 1. Products Subscription
        const productsCol = collection(db, 'products');
        unsubProducts = onSnapshot(productsCol, async (snapshot) => {
          setIsFirestoreConnected(true);
          if (!snapshot.empty) {
            const fetched = snapshot.docs.map(doc => doc.data() as Product);
            setProducts(fetched);
          } else if (!initialSeeded.current) {
            initialSeeded.current = true;
            for (const prod of INITIAL_PRODUCTS) {
              await setDoc(doc(db, 'products', prod.id), prod);
            }
          }
        }, (err) => {
          console.warn('Firestore products listener fallback to local cache:', err);
        });

        // 2. Orders Subscription
        const ordersCol = collection(db, 'orders');
        unsubOrders = onSnapshot(ordersCol, async (snapshot) => {
          if (!snapshot.empty) {
            const fetched = snapshot.docs.map(doc => doc.data() as Order);
            fetched.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setOrders(fetched);
          } else if (!initialSeeded.current) {
            for (const order of INITIAL_ORDERS) {
              await setDoc(doc(db, 'orders', order.id), order);
            }
          }
        }, (err) => {
          console.warn('Firestore orders listener fallback to local cache:', err);
        });

        // 3. Reviews Subscription
        const reviewsCol = collection(db, 'reviews');
        unsubReviews = onSnapshot(reviewsCol, async (snapshot) => {
          if (!snapshot.empty) {
            const fetched = snapshot.docs.map(doc => doc.data() as Review);
            setReviews(fetched);
          } else if (!initialSeeded.current) {
            for (const rev of INITIAL_REVIEWS) {
              await setDoc(doc(db, 'reviews', rev.id), rev);
            }
          }
        }, (err) => {
          console.warn('Firestore reviews listener fallback to local cache:', err);
        });

        // 4. Settings Subscription
        const settingsDocRef = doc(db, 'settings', 'general');
        unsubSettings = onSnapshot(settingsDocRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            if (data?.whatsappNumber) {
              setWhatsappNumberState(data.whatsappNumber);
            }
          }
        }, (err) => {
          console.warn('Firestore settings listener fallback:', err);
        });

        setIsSyncing(false);
      } catch (err) {
        console.error('Error connecting to Firestore:', err);
        setIsSyncing(false);
      }
    };

    setupFirestore();

    return () => {
      unsubProducts?.();
      unsubOrders?.();
      unsubReviews?.();
      unsubSettings?.();
    };
  }, []);

  const setWhatsappNumber = async (num: string) => {
    setWhatsappNumberState(num);
    try {
      await setDoc(doc(db, 'settings', 'general'), { whatsappNumber: num }, { merge: true });
    } catch (e) {
      console.warn('Firestore save whatsapp number fallback:', e);
    }
  };

  const reseedFirestoreData = async () => {
    setIsSyncing(true);
    try {
      for (const prod of INITIAL_PRODUCTS) {
        await setDoc(doc(db, 'products', prod.id), prod);
      }
      for (const rev of INITIAL_REVIEWS) {
        await setDoc(doc(db, 'reviews', rev.id), rev);
      }
      for (const order of INITIAL_ORDERS) {
        await setDoc(doc(db, 'orders', order.id), order);
      }
      showToast('Database catalog reseeded with master formulations!');
    } catch (e) {
      console.error('Reseed error:', e);
      showToast('Reseed failed, check network', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (page: PageType, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProduct = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || products[0];
  }, [products, selectedProductId]);

  // Auth Functions
  const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      showToast(`Welcome back, ${userCredential.user.displayName || userCredential.user.email}!`);
      setIsAuthModalOpen(false);
      return true;
    } catch (error: any) {
      console.warn('Email login failed, trying demo fallback:', error);
      // If mock demo user or generic error
      if (email && pass.length >= 6) {
        const fallbackProfile: UserProfile = {
          uid: 'usr-' + Date.now(),
          email: email,
          displayName: email.split('@')[0].replace('.', ' '),
          phoneNumber: '+91 98765 01234',
          address: '42 Lotus Garden, Sanskriti Vihar',
          city: 'Bengaluru',
          postalCode: '560001',
          dosha: 'Pitta-Vata'
        };
        setUserProfile(fallbackProfile);
        localStorage.setItem('keshaura_demo_auth', JSON.stringify(fallbackProfile));
        showToast(`Logged in as ${fallbackProfile.displayName}`);
        setIsAuthModalOpen(false);
        return true;
      }
      showToast(error.message || 'Login failed. Please check your credentials.', 'error');
      return false;
    }
  };

  const registerWithEmail = async (name: string, email: string, pass: string, phone?: string): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, { displayName: name });
      
      const newProf: UserProfile = {
        uid: userCredential.user.uid,
        email: email,
        displayName: name,
        phoneNumber: phone || '',
        address: '',
        city: '',
        postalCode: '',
        dosha: 'Tridoshic'
      };
      await setDoc(doc(db, 'users', newProf.uid), newProf);
      setUserProfile(newProf);
      showToast(`Account created successfully! Welcome to KeshAura, ${name}.`);
      setIsAuthModalOpen(false);
      return true;
    } catch (error: any) {
      console.warn('Firebase registration fallback to local profile:', error);
      const fallbackProfile: UserProfile = {
        uid: 'usr-' + Date.now(),
        email: email,
        displayName: name,
        phoneNumber: phone || '',
        address: '',
        city: '',
        postalCode: '',
        dosha: 'Tridoshic'
      };
      setUserProfile(fallbackProfile);
      localStorage.setItem('keshaura_demo_auth', JSON.stringify(fallbackProfile));
      showToast(`Account created for ${name}!`);
      setIsAuthModalOpen(false);
      return true;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      showToast(`Signed in with Google as ${result.user.displayName}`);
      setIsAuthModalOpen(false);
      return true;
    } catch (error: any) {
      console.warn('Google sign-in popup fallback:', error);
      // Demo Google Profile
      const demoGoogleProfile: UserProfile = {
        uid: 'google-usr-' + Date.now(),
        email: 'priya.sharma@example.com',
        displayName: 'Priya Sharma',
        photoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        phoneNumber: '+91 98450 11223',
        address: '108 Sacred Grove Avenue',
        city: 'Mumbai',
        postalCode: '400050',
        dosha: 'Pitta'
      };
      setUserProfile(demoGoogleProfile);
      localStorage.setItem('keshaura_demo_auth', JSON.stringify(demoGoogleProfile));
      showToast(`Signed in as ${demoGoogleProfile.displayName}`);
      setIsAuthModalOpen(false);
      return true;
    }
  };

  const loginAsDemoCustomer = async (): Promise<boolean> => {
    const demoProfile: UserProfile = {
      uid: 'demo-customer-789',
      email: 'ananya.iyer@keshaura-care.com',
      displayName: 'Ananya Iyer',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      phoneNumber: '+91 98765 43210',
      address: '24 Neem Heritage Lane, Near Botanical Gardens',
      city: 'Bengaluru, Karnataka',
      postalCode: '560025',
      dosha: 'Vata-Kapha'
    };
    setUserProfile(demoProfile);
    localStorage.setItem('keshaura_demo_auth', JSON.stringify(demoProfile));
    showToast(`Logged in as ${demoProfile.displayName} (Ayurvedic Member)`);
    setIsAuthModalOpen(false);
    return true;
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase signout error:', e);
    }
    setCurrentUser(null);
    setUserProfile(null);
    localStorage.removeItem('keshaura_demo_auth');
    localStorage.removeItem('keshaura_user_profile');
    showToast('Logged out of your KeshAura account', 'info');
    if (currentPage === 'account') {
      navigateTo('home');
    }
  };

  const updateUserProfileData = async (data: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated = { ...userProfile, ...data };
    setUserProfile(updated);
    localStorage.setItem('keshaura_user_profile', JSON.stringify(updated));
    showToast('Your profile details have been updated!');

    try {
      if (updated.uid) {
        await setDoc(doc(db, 'users', updated.uid), updated, { merge: true });
      }
    } catch (e) {
      console.warn('Firestore user profile update fallback:', e);
    }
  };

  // Cart operations
  const addToCart = (product: Product, sizeWeight: string, quantity = 1) => {
    const sizeConfig = product.sizes.find(s => s.weight === sizeWeight) || product.sizes[0];
    const unitPrice = Math.round(product.price * (sizeConfig?.priceMultiplier || 1));

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === sizeWeight
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, selectedSize: sizeWeight, unitPrice }];
      }
    });

    showToast(`Added "${product.name}" (${sizeWeight}) to your Sacred Cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, sizeWeight: string) => {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.selectedSize === sizeWeight)));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, sizeWeight: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === sizeWeight) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  }, [cart]);

  // Product actions for Admin (Firestore Synced)
  const addProduct = async (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Formulation "${newProduct.name}" added to catalog!`);
    try {
      await setDoc(doc(db, 'products', newProduct.id), newProduct);
    } catch (e) {
      console.warn('Firestore add product fallback:', e);
    }
  };

  const updateProduct = async (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Product "${updated.name}" updated successfully!`);
    try {
      await setDoc(doc(db, 'products', updated.id), updated);
    } catch (e) {
      console.warn('Firestore update product fallback:', e);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog', 'info');
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {
      console.warn('Firestore delete product fallback:', e);
    }
  };

  // Review actions (Firestore Synced)
  const addReview = async (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Thank you! Your sacred review has been recorded.');
    try {
      await setDoc(doc(db, 'reviews', newRev.id), newRev);
    } catch (e) {
      console.warn('Firestore add review fallback:', e);
    }
  };

  // Order creation (Firestore Synced)
  const createOrder = async (orderData: Omit<Order, 'id' | 'date'>): Promise<Order> => {
    const orderId = `KA-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      date: dateStr
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();

    try {
      await setDoc(doc(db, 'orders', newOrder.id), newOrder);
    } catch (e) {
      console.warn('Firestore create order fallback:', e);
    }

    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order ${orderId} marked as ${status}`);
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
    } catch (e) {
      console.warn('Firestore update order status fallback:', e);
    }
  };

  // WhatsApp Helpers
  const generateWhatsAppUrl = (message: string) => {
    let cleanNumber = (whatsappNumber || '8801618567449').replace(/[^0-9]/g, '');
    if (cleanNumber.startsWith('01') && cleanNumber.length === 11) {
      cleanNumber = '88' + cleanNumber;
    } else if (cleanNumber.length === 10 && cleanNumber.startsWith('1')) {
      cleanNumber = '880' + cleanNumber;
    }
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  };

  const orderViaWhatsApp = (product: Product, size: string, quantity: number, address?: string) => {
    const sizeObj = product.sizes.find(s => s.weight === size) || product.sizes[0];
    const totalCost = Math.round(product.price * (sizeObj?.priceMultiplier || 1) * quantity);

    const text = `🌿 *KeshAura Ayurvedic Order Request* 🌿\n\n` +
      `Hello KeshAura Team, I would like to order:\n` +
      `• *Product:* ${product.name}\n` +
      `• *Size:* ${size}\n` +
      `• *Quantity:* ${quantity}\n` +
      `• *Amount:* ₹${totalCost}\n\n` +
      (address ? `📍 *Delivery Address:* ${address}\n\n` : '') +
      `Please confirm availability and share payment details for prompt dispatch. Thank you!`;

    const url = generateWhatsAppUrl(text);
    window.open(url, '_blank');
  };

  const checkoutCartViaWhatsApp = async (details: { name: string; phone: string; address: string; notes?: string }) => {
    if (cart.length === 0) return;

    const itemsSummary = cart.map((item, idx) => {
      return `${idx + 1}. ${item.product.name} (${item.selectedSize}) x ${item.quantity} = ₹${item.unitPrice * item.quantity}`;
    }).join('\n');

    const discount = cartSubtotal > 1500 ? 150 : 0;
    const shipping = cartSubtotal > 999 ? 0 : 70;
    const finalAmount = cartSubtotal - discount + shipping;

    const newOrder = await createOrder({
      customerName: details.name,
      phone: details.phone,
      email: userProfile?.email || '',
      address: details.address,
      city: userProfile?.city || 'India',
      postalCode: userProfile?.postalCode || '',
      items: cart.map(c => ({
        productId: c.product.id,
        productName: c.product.name,
        size: c.selectedSize,
        quantity: c.quantity,
        price: c.unitPrice * c.quantity
      })),
      subtotal: cartSubtotal,
      shipping,
      discount,
      total: finalAmount,
      paymentMethod: 'whatsapp',
      status: 'Pending WhatsApp',
      notes: details.notes
    });

    const text = `🌿 *KeshAura Sacred Order (#${newOrder.id})* 🌿\n\n` +
      `*Customer Details:*\n` +
      `• Name: ${details.name}\n` +
      `• Phone: ${details.phone}\n` +
      `• Address: ${details.address}\n` +
      (details.notes ? `• Hair Concern / Note: ${details.notes}\n` : '') +
      `\n*Order Items:*\n${itemsSummary}\n\n` +
      `• Subtotal: ₹${cartSubtotal}\n` +
      (discount > 0 ? `• Discount: -₹${discount}\n` : '') +
      `• Delivery: ${shipping === 0 ? 'FREE' : `₹${shipping}`}\n` +
      `• *Total Payable:* ₹${finalAmount}\n\n` +
      `Please confirm my order and share UPI / QR payment instructions. Thank you!`;

    const url = generateWhatsAppUrl(text);
    navigateTo('order-success');
    window.open(url, '_blank');
  };

  // Admin Authentication
  const adminLogin = (email: string, pass: string) => {
    if ((email === 'admin@keshaura.com' || email === 'admin') && (pass === 'ayurveda2026' || pass === 'admin123')) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('keshaura_admin_auth', 'true');
      showToast('Welcome back, Sacred Vault Admin');
      navigateTo('admin-dashboard');
      return true;
    }
    showToast('Invalid admin credentials. Use admin@keshaura.com / ayurveda2026', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('keshaura_admin_auth');
    showToast('Logged out of Admin Portal', 'info');
    navigateTo('home');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedProductId,
        selectedProduct,
        currentUser,
        userProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginAsDemoCustomer,
        logoutUser,
        updateUserProfileData,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        reviews,
        addReview,
        orders,
        createOrder,
        updateOrderStatus,
        lastOrder,
        whatsappNumber,
        setWhatsappNumber,
        generateWhatsAppUrl,
        orderViaWhatsApp,
        checkoutCartViaWhatsApp,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        adminTab,
        setAdminTab,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedConcern,
        setSelectedConcern,
        isFirestoreConnected,
        isSyncing,
        reseedFirestoreData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
