import { Product, Review, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'keshaura-organic-hair-pack',
    name: 'KeshAura Nourishing Hair Pack',
    subtitle: 'The Sacred 18-Herb Restorative Blend',
    tagline: 'Ancient Ayurvedic formula for root strengthening, deep conditioning, and lustrous hair growth.',
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 184,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWSHizxand8Xa1ZLQSHrHQ3U_JanngSyXlMt0ctAPs7UwEssRof2C7VaqhgFBay65dfuSPIxs9nCcK1tR1mrdFzIufRzVfBue7epv0Y_uvDDlyKePEO6vt7pc6Nr9GvbI6ymlB0kqoD3Fkj-_MPU6_JHv5t8ktGu2I1wTZJIBVXC5hNjsCZJNXBL3RmKJIJfuAI3AFj6VLjZG4wZS8d8doajjmd4xuwTUp6kZBmtLHkM9V4yjJij5voA',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWSHizxand8Xa1ZLQSHrHQ3U_JanngSyXlMt0ctAPs7UwEssRof2C7VaqhgFBay65dfuSPIxs9nCcK1tR1mrdFzIufRzVfBue7epv0Y_uvDDlyKePEO6vt7pc6Nr9GvbI6ymlB0kqoD3Fkj-_MPU6_JHv5t8ktGu2I1wTZJIBVXC5hNjsCZJNXBL3RmKJIJfuAI3AFj6VLjZG4wZS8d8doajjmd4xuwTUp6kZBmtLHkM9V4yjJij5voA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdR058pF33zWqfjco8DimFq57L3oAlZhLtrNAs9uGcyRZ2KCvdFuj5bvWbiZZcUder9QDT0xxn_6BoQmtD-HhBqOB13TRdWeg6ElLYL_Rqiag9BzMYK4FpK6KpypbU_RTMYsVkvfStlbDHlJ1sH7gZzn6-rPGVPtsGgmrFzH1XEzl7cnGCdTGkJy7mHizXdV94R0_8EZ_jfMX4bnKKayZedPzti3srplveWOvRb5Q5wev-_XHHBuH4rw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOLdJq7lV5hU_SP1kDvvWU4BAkG5KPSURjZ2mGdj1T9wYfIpbzTZ60PQufV_eeleDwKfksTmynQcr8LPsxGggcTtcUnDjbLrG19LUwy25kFSDnV43_yNMrKPt9N4ZW6xTZI5kPlvmIU_YOXwwJD_1IJN7aD7Tc8jpDuxsGZKsZYeHj4VseQSvTX8ZGEGHKDT8cm0nltVXfz79krnvPVVJfYt5AqpvaOL8AmcpSgSHbKOxb8q9S6ED7Zw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYebP8XuRw6L2026jGfrtX_-3hOumklNk0kq2KG2kB_5ORsMs5_Tecaj2jjXCPYSzm2m68VZtdjB62twxI5Dv--vdQ2wgJY2HJV4ostCx2nNshMm_P6yGo9Tl6co07R4j31AhJl0oirkEmpQ3uUHlyRqdy1U_-OD00aNcdgfgPKTT3lIODP-RCVLXRASIfLOa_OiE8ZWsRP_qdUunJYU2zbsGXHt4Wg7yV1aa4Ad5uBTVnUZdRU--stg'
    ],
    category: 'hair-pack',
    badge: 'Best Seller',
    isBestSeller: true,
    stock: 45,
    sizes: [
      { weight: '100g (Approx. 4-5 Rituals)', priceMultiplier: 1 },
      { weight: '250g (Family Pack - 12 Rituals)', priceMultiplier: 2.2 },
      { weight: '500g (Therapeutic Jar - 25 Rituals)', priceMultiplier: 4 }
    ],
    description: 'Crafted with cold-stone ground whole herbs hand-harvested in Kerala. This sacred hair ritual awakens dormant hair follicles, reduces stress-induced hair thinning, and seals split ends with raw bio-nutrients. Free from chemicals, preservatives, synthetic colors, or artificial fragrances.',
    benefits: [
      'Reduces excessive hair fall within 3 weeks of regular ritual',
      'Encourages new baby hair growth at receding hairlines',
      'Deeply conditions rough, dry cuticles without chemical buildup',
      'Balances scalp pH and eliminates stubborn dry dandruff',
      'Delays premature greying with potent natural antioxidants'
    ],
    ingredients: [
      { name: 'Bhringraj', botanical: 'Eclipta Alba', benefit: 'The King of Hair - promotes circulation and cellular regeneration', percentage: '25%' },
      { name: 'Brahmi', botanical: 'Bacopa Monnieri', benefit: 'Calms scalp inflammation and fortifies hair roots', percentage: '20%' },
      { name: 'Amla', botanical: 'Phyllanthus Emblica', benefit: 'Vitamin C rich antioxidant preventing premature pigment loss', percentage: '18%' },
      { name: 'Hibiscus Petals', botanical: 'Hibiscus Rosa-Sinensis', benefit: 'Natural amino acids and mucilage for silk-like conditioning', percentage: '15%' },
      { name: 'Methi (Fenugreek)', botanical: 'Trigonella Foenum-Graecum', benefit: 'High protein and nicotinic acid against follicular damage', percentage: '12%' },
      { name: 'Neem & Tulsi', botanical: 'Azadirachta Indica', benefit: 'Anti-fungal shield keeping scalp clean and itch-free', percentage: '10%' }
    ],
    usageSteps: [
      { step: 1, title: 'Mix & Awaken', desc: 'Mix 2-3 tablespoons with warm water, curd, or rose water in a wooden bowl. Let it bloom for 15 minutes.' },
      { step: 2, title: 'Apply from Root to Tip', desc: 'Part your hair and gently massage the herbal paste directly onto scalp and through strands.' },
      { step: 3, title: 'Bathe in Peace', desc: 'Leave on for 30-45 minutes. Rinse thoroughly with lukewarm water. No shampoo required.' }
    ],
    dosha: ['Tridoshic', 'Vata', 'Pitta'],
    hairConcerns: ['Hair Fall', 'Thinning', 'Dryness', 'Premature Greying'],
    scentProfile: 'Earthy vetiver, fresh crushed herbs, and sun-dried amla'
  },
  {
    id: 'revitalizing-scalp-mask',
    name: 'Revitalizing Hibiscus & Amla Mask',
    subtitle: 'Deep Conditioning & Color-Lock Formulation',
    tagline: 'Hydrates stressed strands with organic cold-pressed botanicals and botanical keratin.',
    price: 749,
    originalPrice: 999,
    rating: 4.8,
    reviewCount: 96,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2vCHBW2z_Fv-ryyekmlk1ovl8c6XUkELIuoeucNZM-cb7yMrBtBPnxZtEF2e3gsYpRznis29VQHkscQg_TWJTlFYyAF7rliUYNneydaIUMGp9njOQ-6Fshxbq_HkjGTHFRdHdJ8q47iyaUGcEE0N0aNvX8Io3SHIjlHc8loz-2HxDOL0IEJQ5s0QOdBGGClrHoimd4zjp3UhNpqXP8vSKKdzZ6o8o8Wpw4VzLKSCNaJgkSPKb7pnDmw',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2vCHBW2z_Fv-ryyekmlk1ovl8c6XUkELIuoeucNZM-cb7yMrBtBPnxZtEF2e3gsYpRznis29VQHkscQg_TWJTlFYyAF7rliUYNneydaIUMGp9njOQ-6Fshxbq_HkjGTHFRdHdJ8q47iyaUGcEE0N0aNvX8Io3SHIjlHc8loz-2HxDOL0IEJQ5s0QOdBGGClrHoimd4zjp3UhNpqXP8vSKKdzZ6o8o8Wpw4VzLKSCNaJgkSPKb7pnDmw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjC56dUdKCnif3-0mihEcjlH0yUvTYO9se-4jB7Ow_yhCtg8cQXEYYi9RbF-apT63gYcMIA8Gj1gCtLjt6VyoksTKn4uMSUJMIrKC_EHJeLMJK74AoWuywaSy54fKJXIwWfJuH5d0fi2wxHBISMGyTncBwnryLmn-0aaDu4khC3Exg5qT5Uz30ZvgXn-Z0FgFDgyUXgnX1RvXA2LjrD25uMoj7TCJqqDw3XB84LujzlRRaO_237nAXTg'
    ],
    category: 'hair-pack',
    badge: 'Customer Favorite',
    isBestSeller: false,
    stock: 32,
    sizes: [
      { weight: '100g (Regular)', priceMultiplier: 1 },
      { weight: '250g (Value Jar)', priceMultiplier: 2.1 }
    ],
    description: 'An ultra-soothing herbal mask engineered for frizzy, chemical-treated, or heat-damaged tresses. Restores moisture balance and leaves hair with mirror-like shine.',
    benefits: [
      'Repairs split ends and smoothens rough cuticles',
      'Locks in natural hair sheen without silicone coating',
      'Calms scalp redness and reduces excessive heat (Pitta dosha)'
    ],
    ingredients: [
      { name: 'Crimson Hibiscus', botanical: 'Hibiscus Rosa-Sinensis', benefit: 'Softens dry hair shafts', percentage: '40%' },
      { name: 'Organic Amla', botanical: 'Phyllanthus Emblica', benefit: 'Strengthens elasticity', percentage: '30%' },
      { name: 'Kalonji Seeds', botanical: 'Nigella Sativa', benefit: 'Rich in thymoquinone for cuticle smoothing', percentage: '20%' },
      { name: 'Moringa Leaf', botanical: 'Moringa Oleifera', benefit: 'Packed with 90+ vital nutrients', percentage: '10%' }
    ],
    usageSteps: [
      { step: 1, title: 'Blend', desc: 'Mix with warm coconut milk or aloe vera gel.' },
      { step: 2, title: 'Coat Strands', desc: 'Smooth along the lengths of damp hair and scalp.' },
      { step: 3, title: 'Wash', desc: 'Rinse with cool water after 30 minutes.' }
    ],
    dosha: ['Pitta', 'Vata'],
    hairConcerns: ['Frizz', 'Roughness', 'Heat Damage', 'Split Ends'],
    scentProfile: 'Subtle floral hibiscus and soothing woodsy notes'
  },
  {
    id: 'gentle-cleansing-powder',
    name: 'Herbal Cleansing Hair Wash (No-Poo)',
    subtitle: 'Shikakai, Reetha & Vetiver Daily Clarifier',
    tagline: 'A gentle, foaming Ayurvedic herbal powder that cleanses scalp without stripping essential lipids.',
    price: 649,
    originalPrice: 850,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-RdvTsKBenY-VP0MNCJsviSPk5PleEOcQeYDyEXpHwUAnZc_5q-r6I-4EO43I0BBhIiKm1rxYZr60GwA44LAel8922kGwkms4KeKRPXiSqIi1D6DmkUi7yD0XGACi1CLIHU0L_2Ss1M6wGai_GSZR8m02P3EOIuO_uPQUjlx73QwvB8siJdkeD_sTaOYjfC0iFSVqsvoNioB69Hjzl0yNIL92VubeIx1aHbaBN87-pXphhTVEoMwPfA',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-RdvTsKBenY-VP0MNCJsviSPk5PleEOcQeYDyEXpHwUAnZc_5q-r6I-4EO43I0BBhIiKm1rxYZr60GwA44LAel8922kGwkms4KeKRPXiSqIi1D6DmkUi7yD0XGACi1CLIHU0L_2Ss1M6wGai_GSZR8m02P3EOIuO_uPQUjlx73QwvB8siJdkeD_sTaOYjfC0iFSVqsvoNioB69Hjzl0yNIL92VubeIx1aHbaBN87-pXphhTVEoMwPfA'
    ],
    category: 'cleanser',
    badge: '100% Saponin Rich',
    isBestSeller: false,
    stock: 28,
    sizes: [
      { weight: '150g (Wash Jar)', priceMultiplier: 1 },
      { weight: '350g (Refill Pouch)', priceMultiplier: 2 }
    ],
    description: 'Replace synthetic sulfated shampoos with pure wild soapnut (Reetha) and fruit pods (Shikakai). Cleanses sebum, removes oil buildup naturally, and leaves your hair light and bouncy.',
    benefits: [
      '100% sulfate-free, paraben-free, and chemical-free cleansing',
      'Preserves the scalp moisture microbiome',
      'Naturally conditions hair as you rinse'
    ],
    ingredients: [
      { name: 'Wild Shikakai Pods', botanical: 'Acacia Concinna', benefit: 'Micro-exfoliating natural cleanser', percentage: '35%' },
      { name: 'Reetha (Soapnut)', botanical: 'Sapindus Mukorossi', benefit: 'Natural plant saponin lather', percentage: '35%' },
      { name: 'Nagarmotha', botanical: 'Cyperus Scariosus', benefit: 'Controls excess scalp grease and clarifies', percentage: '15%' },
      { name: 'Vetiver Root', botanical: 'Chrysopogon Zizanioides', benefit: 'Cooling scent and scalp soothe', percentage: '15%' }
    ],
    usageSteps: [
      { step: 1, title: 'Mix', desc: 'Mix 2 spoons with water to form a fluid lathering broth.' },
      { step: 2, title: 'Wash', desc: 'Massage into wet hair for 2-3 minutes.' },
      { step: 3, title: 'Rinse', desc: 'Rinse off with water for fresh, airy volume.' }
    ],
    dosha: ['Kapha', 'Pitta'],
    hairConcerns: ['Oily Scalp', 'Product Buildup', 'Limp Hair'],
    scentProfile: 'Smoky vetiver and wild wildberry'
  },
  {
    id: 'calming-scalp-treatment',
    name: 'Calming Scalp & Root Detox Pack',
    subtitle: 'Neem, Tulsi & Camphor Anti-Dandruff Elixir',
    tagline: 'Intensive scalp therapy to eradicate chronic flaking, itching, and bacterial build-up.',
    price: 799,
    originalPrice: 1050,
    rating: 4.9,
    reviewCount: 112,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK3SjtdHWCOdY2mHjlCyyzDARas65bJr2VdOZ6Ist4Tmhl7rFKq5eFhNZNU-VfyHr92ocGpKotUTc_jmO6WgOrLaAnIZCsVxn4LWvmCTrtfXenPnK0Ly34qFkBlJc1BSiEwlGSMSD9e2ABw41GXHgkdTaMZvASvohfpDrtsiW_rSG8QMxkvBvzTjR5KgGl0-vIfMHnU84evrFa2oG-FlKfQmwXMEHXwCX7BqB3tYsvs_A7THuv9PC1vQ',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDK3SjtdHWCOdY2mHjlCyyzDARas65bJr2VdOZ6Ist4Tmhl7rFKq5eFhNZNU-VfyHr92ocGpKotUTc_jmO6WgOrLaAnIZCsVxn4LWvmCTrtfXenPnK0Ly34qFkBlJc1BSiEwlGSMSD9e2ABw41GXHgkdTaMZvASvohfpDrtsiW_rSG8QMxkvBvzTjR5KgGl0-vIfMHnU84evrFa2oG-FlKfQmwXMEHXwCX7BqB3tYsvs_A7THuv9PC1vQ'
    ],
    category: 'scalp-care',
    badge: 'Therapeutic Grade',
    isBestSeller: true,
    stock: 21,
    sizes: [
      { weight: '100g (Standard)', priceMultiplier: 1 },
      { weight: '250g (Eco Jar)', priceMultiplier: 2.2 }
    ],
    description: 'Targeted root therapy formulated with high-potency organic Neem, holy Tulsi, and Bhringraj. Disinfects follicular pores, eliminates stubborn fungal dandruff, and relieves itchiness on contact.',
    benefits: [
      '99% reduction in dandruff flakes after 4 ritual sessions',
      'Soothes angry red scalp patches and inflammation',
      'Provides invigorating cooling sensation'
    ],
    ingredients: [
      { name: 'Organic Neem Leaves', botanical: 'Azadirachta Indica', benefit: 'Broad-spectrum antimicrobial protection', percentage: '35%' },
      { name: 'Holy Tulsi', botanical: 'Ocimum Sanctum', benefit: 'Purifies scalp micro-climate', percentage: '25%' },
      { name: 'Kapur Kachri', botanical: 'Hedychium Spicatum', benefit: 'Stimulates microcirculation and cools', percentage: '20%' },
      { name: 'Triphala Powder', botanical: 'Three Myrobalans', benefit: 'Rich in organic astringents and tannins', percentage: '20%' }
    ],
    usageSteps: [
      { step: 1, title: 'Prepare', desc: 'Mix with warm water and 1 spoon of lemon juice or curd.' },
      { step: 2, title: 'Target Scalp', desc: 'Massage deeply into scalp focusing on affected flake areas.' },
      { step: 3, title: 'Cleanse', desc: 'Rinse with tepid water after 25-30 minutes.' }
    ],
    dosha: ['Kapha', 'Pitta'],
    hairConcerns: ['Dandruff', 'Scalp Itch', 'Excess Flaking', 'Seborrheic Scalp'],
    scentProfile: 'Fresh green holy basil and therapeutic cooling herbs'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'keshaura-organic-hair-pack',
    author: 'Ananya Sharma',
    location: 'Bengaluru, India',
    rating: 5,
    date: '3 days ago',
    title: 'Hair fall stopped noticeably within 3 weeks!',
    comment: 'I was dealing with terrifying post-partum hair loss. A friend recommended KeshAura. After using this hair pack twice a week mixed with fresh curd, my hair texture has transformed. Less shedding on my brush and lots of baby hair popping up along my hairline!',
    verified: true,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClnX47ugvuqpgFT9u1NQCWSUsO3gw-UK70F-DFbnZliBAxdN3tlvNLaOIimrXkybEmBIeRS8BaTRE09WCjjbBtyziiugIkpxR2hYaFPfxMjkCjFWf88LIcx2cEwvFy3HsG0x5M4aebi2_fv2FpA8AxUS5ogay7HdjwTA2HNzq2aSrteO-_STVbt0P_kccJJX1u8_iJ1J3USSLrfcI6rD8R10zc2dDElPvTgIIGhrTdmC1_huEJ3GEmHg',
    doshaType: 'Vata'
  },
  {
    id: 'rev-2',
    productId: 'keshaura-organic-hair-pack',
    author: 'Priyamvada Sen',
    location: 'Mumbai, India',
    rating: 5,
    date: '1 week ago',
    title: 'The authentic Ayurvedic aroma is heavenly',
    comment: 'You can immediately tell there are zero synthetic perfumes or fillers. It smells of real crushed sun-dried herbs and wild amla. My curls feel silky soft and hydrated without any greasy residue. Customer care on WhatsApp was also super helpful with dosage tips.',
    verified: true,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFpqc-BR5If8BISMIG9gRC_JInAPVCJMg8_GWNkavGTcehfFP7BdDQLiglp4W7LT_t_WyztqrcsMfe-ZJXPIIXRYwbFIBE94Zj79kc8uVt4P73g95UZO-JdVj7paPkHvwbA826sM3LigJRkGoNcBFKewDU8iTx0DWfhwtWNcyKwxIqjor3ttUzwo43Fym3CY8l0WOwR1dGg34o9Xwf-JcPRhk_Ecr3-WA0dnQo4GugD7BvlJfmC5H7rg',
    doshaType: 'Pitta'
  },
  {
    id: 'rev-3',
    productId: 'calming-scalp-treatment',
    author: 'Devendra Kulkarni',
    location: 'Pune, India',
    rating: 5,
    date: '2 weeks ago',
    title: 'Finally cleared my stubborn winter dandruff',
    comment: 'Tried so many chemical zinc pyrithione shampoos that made my hair like straw. This neem & tulsi scalp detox cleared the flakes gently after just 3 applications. My scalp feels calm, cool, and refreshed.',
    verified: true,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7OC7RsFJagJ43NF6T8bvLsmk6RDwuNMJSLNRe_ubz-agPhpccqLcFSBz5EFB1RmsFFd7zkxmHibOItQUfNjbYPK14e-KZpvzE2Yq-7fK0V817w-1SSiZo1oJEOUAN3p6nqSyzrhpTccIpEXrVw3CPGktkhG1j2sZSq7EO7lzxwThEG4ubGm7BqbFcPOqXEMG_XmnsuAw85g-tv88Du27tCwe073PjaWEcmNO0JME_D5Y_Jt_k2bYvkQ',
    doshaType: 'Kapha'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'KA-8921',
    date: '2026-09-01 10:24 AM',
    customerName: 'Meera Nambiar',
    phone: '+91 98450 12389',
    email: 'meera.nambiar@gmail.com',
    address: 'Flat 402, Shanti Nilayam, Indiranagar',
    city: 'Bengaluru',
    postalCode: '560038',
    hairConcerns: 'Post-partum hair fall and scalp dryness',
    items: [
      {
        productId: 'keshaura-organic-hair-pack',
        productName: 'KeshAura Nourishing Hair Pack',
        size: '250g (Family Pack - 12 Rituals)',
        quantity: 2,
        price: 1978
      },
      {
        productId: 'gentle-cleansing-powder',
        productName: 'Herbal Cleansing Hair Wash (No-Poo)',
        size: '150g (Wash Jar)',
        quantity: 1,
        price: 649
      }
    ],
    subtotal: 2627,
    shipping: 0,
    discount: 200,
    total: 2427,
    paymentMethod: 'whatsapp',
    status: 'Pending WhatsApp',
    notes: 'Customer asked for customized application routine for curly hair.'
  },
  {
    id: 'KA-8920',
    date: '2026-08-31 04:15 PM',
    customerName: 'Rohan Deshmukh',
    phone: '+91 98201 44521',
    email: 'rohan.d@outlook.com',
    address: 'B-12, Green Meadows, Koregaon Park',
    city: 'Pune',
    postalCode: '411001',
    hairConcerns: 'Dandruff and scalp irritation',
    items: [
      {
        productId: 'calming-scalp-treatment',
        productName: 'Calming Scalp & Root Detox Pack',
        size: '100g (Standard)',
        quantity: 1,
        price: 799
      }
    ],
    subtotal: 799,
    shipping: 50,
    discount: 0,
    total: 849,
    paymentMethod: 'cod',
    status: 'Processing',
    notes: 'Dispatched from Kerala depot.'
  },
  {
    id: 'KA-8919',
    date: '2026-08-30 02:40 PM',
    customerName: 'Sunita Raman',
    phone: '+91 97110 88912',
    email: 'sunita.raman@yahoo.com',
    address: 'Plot 44, Jubilee Hills, Rd No 10',
    city: 'Hyderabad',
    postalCode: '500033',
    hairConcerns: 'Premature greying & heat damaged strands',
    items: [
      {
        productId: 'keshaura-organic-hair-pack',
        productName: 'KeshAura Nourishing Hair Pack',
        size: '500g (Therapeutic Jar - 25 Rituals)',
        quantity: 1,
        price: 3596
      },
      {
        productId: 'revitalizing-scalp-mask',
        productName: 'Revitalizing Hibiscus & Amla Mask',
        size: '100g (Regular)',
        quantity: 1,
        price: 749
      }
    ],
    subtotal: 4345,
    shipping: 0,
    discount: 400,
    total: 3945,
    paymentMethod: 'online',
    status: 'Shipped',
    notes: 'Express courier tracking #BLUEDART-882910'
  }
];

export const AYURVEDIC_HERBS = [
  {
    name: 'Bhringraj',
    hindi: 'भृंगराज',
    tag: 'King of Hair',
    description: 'Activates microcirculation around hair roots, reviving dormant follicles and preventing early whitening.',
    icon: 'spa'
  },
  {
    name: 'Brahmi',
    hindi: 'ब्राह्मी',
    tag: 'Mind & Root Soother',
    description: 'Nourishes brain cells, alleviates cortisol stress that triggers hair shedding, and provides profound cooling.',
    icon: 'psychology'
  },
  {
    name: 'Amla',
    hindi: 'आंवला',
    tag: 'Vitamin C Shield',
    description: 'Abundant in tannins and natural vitamin C, shielding natural hair pigments against sun and oxidation.',
    icon: 'eco'
  },
  {
    name: 'Shikakai',
    hindi: 'शिकाकाई',
    tag: 'Natural Cleanser',
    description: 'Rich in gentle botanical saponins that cleanse oily impurities without disturbing the natural lipid mantle.',
    icon: 'clean_hands'
  },
  {
    name: 'Hibiscus',
    hindi: 'गुड़हल',
    tag: 'Natural Conditioner',
    description: 'Rich in amino acids and soothing mucilage, leaving hair with radiant shine and bouncy texture.',
    icon: 'local_florist'
  },
  {
    name: 'Neem & Tulsi',
    hindi: 'नीम-तुलसी',
    tag: 'Purifying Shield',
    description: 'Ancient antifungal botanicals that eliminate stubborn dandruff, itchiness, and bacterial buildup.',
    icon: 'shield_moon'
  }
];

export const FAQS = [
  {
    question: 'How often should I use the KeshAura hair pack?',
    answer: 'For best results, we recommend using the pack 1 to 2 times a week. If you have severe hair fall or chronic dandruff, use twice weekly for the first month, then switch to once weekly for maintenance.'
  },
  {
    question: 'How do I place an order via WhatsApp?',
    answer: 'Simply click the "Order on WhatsApp" button on any product or during checkout. It will automatically compose an order message with your product selection and delivery address. Our Ayurvedic concierge will instantly verify your order and guide you through payment.'
  },
  {
    question: 'Can I mix the powder with ingredients at home?',
    answer: 'Yes! While plain warm water or rose water works wonderfully, you can mix with fresh curd/yogurt for intense moisture, aloe vera gel for scalp soothing, or coconut milk for dry damaged curls.'
  },
  {
    question: 'Is it safe for color-treated or chemically straightened hair?',
    answer: 'Absolutely. Our formulations are 100% natural and free of synthetic salts, sulfates, and ammonia. In fact, our Hibiscus & Amla mask is specifically recommended to repair chemical damage.'
  },
  {
    question: 'Are there any preservatives, synthetic fragrances, or fillers?',
    answer: 'None at all. We believe in complete purity. Each batch is stone-ground from solar-dried whole botanicals. What you smell and feel is 100% pure raw botanical essence.'
  }
];
