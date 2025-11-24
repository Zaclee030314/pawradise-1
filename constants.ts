
import { Event, Place, BlogPost, Product, Partner } from './types';

export const MOCK_PARTNERS: Partner[] = [
    { id: '1', name: 'Royal Canin', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Royal_Canin_logo.svg/2560px-Royal_Canin_logo.svg.png', type: 'Brand' },
    { id: '2', name: 'Desa ParkCity', logo: 'https://www.desaparkcity.com/assets/images/logo-dpc.png', type: 'Venue' },
    { id: '3', name: 'Jaya One', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Jaya_One_Logo.png', type: 'Venue' },
    { id: '4', name: 'GrabPet', logo: 'https://assets.grab.com/wp-content/uploads/sites/8/2019/02/27162227/GrabPet-Logo.png', type: 'Brand' },
    { id: '5', name: 'PetFinder.my', logo: 'https://www.petfinder.my/images/logo.png', type: 'Organizer' }
];

export const MOCK_EVENTS: Event[] = [
  // --- PetzPawradise Official Events ---
  {
    id: 'pp-1',
    title: 'PetzPawradise Christmas Pawty',
    date: '19–20 December 2024',
    location: 'Lumi Tropicana, PJ',
    type: 'Pawty',
    organizer: 'PetzPawradise',
    description: 'A magical Christmas celebration designed for you and your furkids.',
    image: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=800&q=80',
    time: '10:00 AM - 9:00 PM',
    price: 'Free Entry',
    fullDescription: 'Ho Ho Ho! Join us for the ultimate Christmas Pawty at Lumi Tropicana. We are transforming the park into a winter wonderland (minus the snow, plus the treats!). Expect a weekend filled with joy, photos, and wagging tails.',
    highlights: [
        'Santa Paws Photo Booth',
        'Best Dressed Christmas Costume Contest',
        'Live Caroling (Human & Dog versions)',
        'Mystery Gift Exchange'
    ]
  },
  {
    id: 'pp-2',
    title: 'PetzPawradise CNY Bazaar',
    date: '15–16 January 2025',
    location: 'Megah Rise Mall, PJ',
    type: 'Bazaar',
    organizer: 'PetzPawradise',
    description: 'Usher in the Year of the Snake with prosperity treats and angpows!',
    image: 'https://images.unsplash.com/photo-1580820665329-90c273d9c4c9?auto=format&fit=crop&w=800&q=80',
    time: '11:00 AM - 8:00 PM',
    price: 'Free Entry',
    fullDescription: 'Huat Ah! Get your furkids ready for the Lunar New Year. We are taking over the pet-friendly Megah Rise Mall for a massive bazaar featuring local vendors, lion dances, and prosperity tossing (Yee Sang) for pets!',
    highlights: [
        'Lion Dance Performance',
        'Pet Yee Sang Tossing Session',
        'CNY Cheongsam/Samfu Fashion Show',
        'Lucky Draw Angpows'
    ]
  },

  // --- Other Community Activities ---
  {
    id: 'ext-1',
    title: 'OhMyPet Expo 2025',
    date: 'February 2025',
    location: 'Mid Valley Exhibition Centre',
    type: 'Bazaar',
    organizer: 'Other',
    description: 'Malaysia’s largest pet expo featuring 500+ brands.',
    image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=800&q=80',
    time: '10:00 AM - 10:00 PM',
    price: 'RM 5 / Ticket',
    fullDescription: 'The biggest gathering of pet lovers in the country. Discover new brands, grab amazing deals on food and accessories, and watch international grooming competitions.',
    highlights: [
        'Adoption Drive',
        'Petting Zoo',
        'Reptile Corner',
        'Grooming Masterclass'
    ]
  },
  {
    id: 'ext-2',
    title: 'Hello Bazaar: Sunset Walk',
    date: 'Every Sunday',
    location: 'Desa ParkCity',
    type: 'Gathering',
    organizer: 'Other',
    description: 'Weekly community dog walk and mini-market by the lake.',
    image: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?auto=format&fit=crop&w=800&q=80',
    time: '5:00 PM - 8:00 PM',
    price: 'Free',
    fullDescription: 'Join the Hello Bazaar community for a relaxing sunset stroll. Perfect for socializing your puppy or just meeting new friends. Pop-up stalls sell lemonade and doggy ice cream.',
    highlights: [
        'Group Walk around the Lake',
        'Sunset Picnic',
        'Frisbee Tournament',
        'Ice Cream Stall'
    ]
  },
  {
    id: 'ext-3',
    title: 'Kucing & Coffee Workshop',
    date: 'March 2025',
    location: 'The Linc KL',
    type: 'Workshop',
    organizer: 'Other',
    description: 'Learn cat massage techniques while enjoying artisanal coffee.',
    image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=800&q=80',
    time: '2:00 PM - 5:00 PM',
    price: 'RM 50 (Inc. Coffee)',
    fullDescription: 'A chill afternoon for cat lovers. Expert vet nurses will teach you how to massage your cat to relieve stress and bond better. Human participants get free flow coffee!',
    highlights: [
        'Cat Massage 101',
        'Coffee Tasting',
        'Behavioral Q&A',
        'Goodie Bag'
    ]
  }
];

export const MOCK_PLACES: Place[] = [
  {
    id: '1',
    name: 'Café Pawse',
    type: 'Cafe',
    location: 'Kuala Lumpur',
    rating: 4.8,
    features: ['Indoor', 'Treats', 'Cat Friendly'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 45, y: 35 },
    description: 'A cozy, pastel-themed cafe designed specifically for cats and quiet dogs. They serve a dedicated pet menu including puppuccinos and fishy treats.',
    address: '123, Jalan Telawi, Bangsar, 59100 Kuala Lumpur',
    openingHours: '10:00 AM - 10:00 PM (Closed Tuesdays)',
    contact: '+60 3-1234 5678'
  },
  {
    id: '2',
    name: 'Central Park Bandar Utama',
    type: 'Park',
    location: 'Selangor',
    rating: 4.7,
    features: ['Outdoor', 'Big Fields', 'Walking Paths'],
    image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 25, y: 55 },
    description: 'One of the few truly dog-friendly parks in PJ. It features a beautiful lake and wide walking paths. Note: Dogs must be on a leash at all times.',
    address: 'Dataran Bandar Utama, Bandar Utama, 47800 Petaling Jaya, Selangor',
    openingHours: 'Open 24 Hours',
    contact: 'N/A'
  },
  {
    id: '3',
    name: 'Taman Desa Pet Park',
    type: 'Park',
    location: 'Kuala Lumpur',
    rating: 4.5,
    features: ['Socializing', 'Morning Walks'],
    image: 'https://images.unsplash.com/photo-1591382696684-38c427c7547a?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 65, y: 65 },
    description: 'A hidden gem for the local community. It is fully fenced, making it great for off-leash play during off-peak hours (check local rules).',
    address: 'Jalan Desa Bakti, Taman Desa, 58100 Kuala Lumpur',
    openingHours: '7:00 AM - 7:00 PM',
    contact: 'N/A'
  },
  {
    id: '4',
    name: 'The Waterfront, Desa ParkCity',
    type: 'Mall',
    location: 'Kuala Lumpur',
    rating: 4.9,
    features: ['Outdoor Mall', 'Off-leash Park Nearby', 'Pet Bazaar'],
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 30, y: 20 },
    description: 'The gold standard for pet-friendly hangouts in KL. Walk by the lake, dine alfresco with your pet, or visit the pet bazaar on weekends.',
    address: '5, Persiaran Residen, Desa ParkCity, 52200 Kuala Lumpur',
    openingHours: '10:00 AM - 10:00 PM',
    contact: '+60 3-6280 8181'
  },
  {
    id: '5',
    name: 'Jaya One',
    type: 'Mall',
    location: 'Selangor',
    rating: 4.6,
    features: ['Pet Toilets', 'Indoor Dining', 'Social Events'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 40, y: 60 },
    description: 'A pioneering pet-friendly mall. They have designated pet toilets and many restaurants allow pets inside (in strollers/carriers) or at designated zones.',
    address: '72A, Jln Universiti, Seksyen 13, 46200 Petaling Jaya, Selangor',
    openingHours: '10:00 AM - 10:00 PM',
    contact: '+60 3-7957 1118'
  },
  {
    id: '6',
    name: 'Hyatt House',
    type: 'Hotel',
    location: 'Kuala Lumpur',
    rating: 4.8,
    features: ['Luxury Stay', 'Pet Welcome Kit'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 50, y: 40 },
    description: 'Need a staycation? Hyatt House welcomes pets with open arms. They provide a bed, bowls, and treats upon arrival. Cleaning fee applies.',
    address: '10, Jalan Kiara, Mont Kiara, 50480 Kuala Lumpur',
    openingHours: 'Check-in: 3:00 PM',
    contact: '+60 3-6419 8688'
  },
  {
    id: '7',
    name: 'Plaza Arkadia',
    type: 'Mall',
    location: 'Kuala Lumpur',
    rating: 4.7,
    features: ['Open Air', 'Pet Friendly Cafes', 'Wide Walkways'],
    image: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 32, y: 22 },
    description: 'A European-style open-air mall. Very breezy and spacious, perfect for evening walks and dinner with your furkid.',
    address: 'Jalan Intisari Perdana, Desa ParkCity, 52200 Kuala Lumpur',
    openingHours: '10:00 AM - 10:00 PM',
    contact: '+60 3-2715 8188'
  },
  {
    id: '8',
    name: 'Maya Park @ Eco Ardence',
    type: 'Park',
    location: 'Selangor',
    rating: 4.6,
    features: ['Lake View', 'Jogging Track', 'Spacious'],
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 15, y: 70 },
    description: 'A huge lake park in Setia Alam. Great for socialization and long walks. There are pet-friendly containers/cafes nearby too.',
    address: 'Persiaran Setia Alam, Setia Alam, 40170 Shah Alam, Selangor',
    openingHours: '6:00 AM - 11:00 PM',
    contact: 'N/A'
  },
  {
    id: '9',
    name: 'Espresso Yourself',
    type: 'Cafe',
    location: 'Selangor',
    rating: 4.4,
    features: ['Cozy', 'Instagrammable', 'Dog Menu'],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 28, y: 58 },
    description: 'Famous for their "Puppy Platter". A great spot for brunch where your dog eats as well as you do.',
    address: '15, Jalan SS 2/75, SS 2, 47300 Petaling Jaya, Selangor',
    openingHours: '8:00 AM - 6:00 PM',
    contact: '+60 3-7866 0000'
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'First Time Pawrent Guide',
    author: 'PetzPawradise',
    date: 'Oct 12, 2024',
    category: 'Guides',
    excerpt: 'Everything you need to know about welcoming your new family member home.',
    content: `
      <p>Welcoming a new furry friend is exciting but can be overwhelming! Here is your starter checklist:</p>
      <ul>
        <li><strong>Food & Water Bowls:</strong> Ceramic or stainless steel are best.</li>
        <li><strong>Cozy Bed:</strong> A safe space for them to retreat to.</li>
        <li><strong>Toys:</strong> For chewing, fetching, and comforting.</li>
      </ul>
      <p>Remember, patience is key during the first week!</p>
    `,
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
    tags: ['Puppy', 'New Owner', 'Checklist'],
    likes: 124
  },
  {
    id: '2',
    title: 'How to Prepare for a Pet Bazaar',
    author: 'PetzPawradise',
    date: 'Nov 05, 2024',
    category: 'Events',
    excerpt: 'Tips to ensure you and your pet have a stress-free and fun shopping experience.',
    content: `
      <p>Pet Bazaars are sensory overload! Here is how to survive:</p>
      <ol>
        <li>Bring a portable water bottle.</li>
        <li>Keep your pet on a short leash.</li>
        <li>Ask before letting your pet greet others.</li>
      </ol>
    `,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    tags: ['Events', 'Socializing', 'Safety'],
    likes: 89
  },
  {
    id: '3',
    title: 'Top 5 Enrichment Toys',
    author: 'PetzPawradise',
    date: 'Nov 20, 2024',
    category: 'Reviews',
    excerpt: 'Keep your pets entertained and mentally stimulated with these top picks.',
    content: `
      <p>Boredom leads to destruction. Try these:</p>
      <ul>
        <li><strong>Snuffle Mats:</strong> Hide treats in fabric strips.</li>
        <li><strong>Lick Mats:</strong> Spread peanut butter or yogurt.</li>
        <li><strong>Puzzle Feeders:</strong> Make them work for their kibble.</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    tags: ['Toys', 'Mental Health', 'Reviews'],
    likes: 210
  },
  {
    id: '4',
    title: 'DIY Frozen Treats for Hot Days',
    author: 'PetzPawradise',
    date: 'Dec 01, 2024',
    category: 'Recipes',
    excerpt: 'Beat the Malaysian heat with these simple 3-ingredient popsicles for dogs and cats.',
    content: `
      <p>It's hot out there! Cool your pup down with this easy recipe.</p>
      <h4 class="font-bold text-brand-orange">The "Watermelon Cooler"</h4>
      <ul>
        <li>1 cup Seedless Watermelon (cubed)</li>
        <li>1/2 cup Coconut Water (unsweetened)</li>
        <li>1 tbsp Honey (optional)</li>
      </ul>
      <p><strong>Instructions:</strong> Blend everything together, pour into silicone molds, and freeze for 4 hours. Paw-fect for a sunny afternoon!</p>
    `,
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80',
    tags: ['Food', 'Summer', 'DIY'],
    likes: 342
  },
  {
    id: '5',
    title: 'Understanding Cat Tail Language',
    author: 'PetzPawradise',
    date: 'Dec 05, 2024',
    category: 'Behavior',
    excerpt: 'Is your cat happy or annoyed? The secret lies in the tail flick.',
    content: `
      <p>Cats speak volumes with their tails. Here is a quick decoder:</p>
      <ul>
        <li><strong>Straight Up:</strong> "I'm happy and confident!"</li>
        <li><strong>Puffed Up:</strong> "I'm terrified, back off!"</li>
        <li><strong>Slow Swish:</strong> "I'm focusing on prey (or your toes)."</li>
        <li><strong>Fast Thumping:</strong> "I am annoyed. Stop touching me."</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80',
    tags: ['Cats', 'Behavior', 'Training'],
    likes: 156
  },
  {
    id: '6',
    title: 'Road Trip with Fido: Packing List',
    author: 'PetzPawradise',
    date: 'Dec 10, 2024',
    category: 'Travel',
    excerpt: 'Going on a cuti-cuti Malaysia trip? Don’t forget these essentials.',
    content: `
      <p>Traveling with pets requires preparation. Don't leave home without:</p>
      <ol>
        <li><strong>Seatbelt harness or crate:</strong> Safety first!</li>
        <li><strong>Collapsible bowls:</strong> For water breaks.</li>
        <li><strong>Poop bags:</strong> Leave no trace.</li>
        <li><strong>First Aid Kit:</strong> Bandages, antiseptic, and vet records.</li>
        <li><strong>Favorite Blanket:</strong> Smells like home to reduce anxiety.</li>
      </ol>
    `,
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=800&q=80',
    tags: ['Travel', 'Dogs', 'Safety'],
    likes: 198
  },
  {
    id: '7',
    title: 'Why Does My Dog Zoomie?',
    author: 'PetzPawradise',
    date: 'Dec 12, 2024',
    category: 'Behavior',
    excerpt: 'The science behind the sudden burst of energy known as FRAPs.',
    content: `
      <p>Zoomies, or Frenetic Random Activity Periods (FRAPs), are totally normal! They usually happen:</p>
      <ul>
        <li>After a bath (relief!)</li>
        <li>Late at night (releasing pent-up energy)</li>
        <li>During play (pure excitement)</li>
      </ul>
      <p>Just clear the way and enjoy the show!</p>
    `,
    image: 'https://images.unsplash.com/photo-1558869229-c7a455045a9b?auto=format&fit=crop&w=800&q=80',
    tags: ['Dogs', 'Funny', 'Science'],
    likes: 412
  },
  {
    id: '8',
    title: 'Indoor Games for Rainy Days',
    author: 'PetzPawradise',
    date: 'Dec 15, 2024',
    category: 'Lifestyle',
    excerpt: 'Stuck inside due to monsoon season? Here is how to tire them out.',
    content: `
      <p>Rain shouldn't stop the fun. Try "Hide and Seek" with treats!</p>
      <p><strong>How to play:</strong></p>
      <ol>
        <li>Put your dog in a "Stay".</li>
        <li>Hide treats around the living room (under rugs, behind chair legs).</li>
        <li>Release them with "Find it!".</li>
      </ol>
      <p>Sniffing is tiring work—10 minutes of sniffing equals 30 minutes of walking!</p>
    `,
    image: 'https://images.unsplash.com/photo-1601758174609-3a49c711832d?auto=format&fit=crop&w=800&q=80',
    tags: ['Training', 'Fun', 'Indoor'],
    likes: 275
  },
  {
    id: '9',
    title: 'Senior Pet Care: Joints & Mobility',
    author: 'PetzPawradise',
    date: 'Dec 18, 2024',
    category: 'Health',
    excerpt: 'Helping your aging best friend stay comfortable and active.',
    content: `
      <p>As our pets age, their joints need extra love.</p>
      <ul>
        <li><strong>Supplements:</strong> Look for Glucosamine and Green Lipped Mussel.</li>
        <li><strong>Ramps:</strong> Use ramps for cars or sofas to reduce impact.</li>
        <li><strong>Short Walks:</strong> Multiple short walks are better than one long hike.</li>
        <li><strong>Warmth:</strong> Keep them cozy; cold joints hurt more!</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    tags: ['Senior', 'Health', 'Wellness'],
    likes: 330
  }
];

// REAL DEPAWZ PRODUCTS
export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'dp-1',
        name: 'Dehydrated Chicken Jerky',
        category: 'Treats',
        description: 'Thinly sliced, lean chicken breast slowly dehydrated to preserve nutrients. High in protein, low in fat.',
        benefits: ['High Protein', 'Muscle Building', 'Low Fat', 'Picky Eater Approved'],
        image: 'https://www.depawz.com/cdn/shop/files/ChickenJerky.png?v=1727681008&width=1080',
        variants: [
            { size: '50g', price: 15.00 },
            { size: '100g', price: 28.00 }
        ],
        tags: ['Dehydrated', 'Chicken', 'Single Ingredient']
    },
    {
        id: 'dp-2',
        name: 'Chicken Feet (Naked)',
        category: 'Chews',
        description: 'Crunchy, natural toothbrush! Rich in glucosamine and chondroitin for joint health.',
        benefits: ['Joint Health', 'Dental Hygiene', 'Natural Glucosamine'],
        image: 'https://www.depawz.com/cdn/shop/files/ChickenFeet.png?v=1727680986&width=1080',
        variants: [
            { size: '5 pcs', price: 10.00 },
            { size: '10 pcs', price: 18.00 }
        ],
        tags: ['Chew', 'Joints', 'Dental']
    },
    {
        id: 'dp-3',
        name: 'Dehydrated Duck Neck',
        category: 'Chews',
        description: 'A fully digestible chew that acts as a natural toothbrush. Great cooling protein for pets with allergies.',
        benefits: ['Dental Cleaning', 'Hypoallergenic', 'Cooling Protein'],
        image: 'https://www.depawz.com/cdn/shop/files/DuckNeck.png?v=1727681072&width=1080',
        variants: [
            { size: '1 pc', price: 5.00 },
            { size: '3 pcs', price: 14.00 }
        ],
        tags: ['Chew', 'Duck', 'Hypoallergenic']
    },
    {
        id: 'dp-4',
        name: 'Pork Loin Chips',
        category: 'Treats',
        description: 'Crispy, lean pork chips. A fantastic alternative for pets allergic to poultry.',
        benefits: ['B Vitamins', 'Novel Protein', 'High Energy'],
        image: 'https://www.depawz.com/cdn/shop/files/PorkLoin.png?v=1727681303&width=1080',
        variants: [
            { size: '50g', price: 16.00 },
            { size: '100g', price: 30.00 }
        ],
        tags: ['Dehydrated', 'Pork', 'Hypoallergenic']
    },
    {
        id: 'dp-5',
        name: 'Shishamo (Capelin Fish)',
        category: 'Treats',
        description: 'Whole dehydrated Shishamo fish including roe. Packed with Omega-3 fatty acids for skin and coat.',
        benefits: ['Skin & Coat', 'Omega-3 Rich', 'Brain Health'],
        image: 'https://www.depawz.com/cdn/shop/files/Shishamo.png?v=1727681403&width=1080',
        variants: [
            { size: '50g', price: 18.00 },
            { size: '100g', price: 34.00 }
        ],
        tags: ['Seafood', 'Skin & Coat', 'Whole Prey']
    },
    {
        id: 'dp-6',
        name: 'Green Lipped Mussel Powder',
        category: 'Supplements',
        description: 'Nature’s superfood for joints. 100% pure New Zealand Green Lipped Mussel.',
        benefits: ['Anti-Inflammatory', 'Super Joint Support', 'Arthritis Relief'],
        image: 'https://www.depawz.com/cdn/shop/files/GLM.png?v=1727681499&width=1080',
        variants: [
            { size: '40g', price: 45.00 }
        ],
        tags: ['Supplement', 'Powder', 'Joints']
    },
    {
        id: 'dp-7',
        name: 'Golden Turmeric Paste Kit',
        category: 'Supplements',
        description: 'DIY Golden Paste mix. Powerful anti-inflammatory and antioxidant support.',
        benefits: ['Immune Booster', 'Anti-Cancer Properties', 'Digestion'],
        image: 'https://www.depawz.com/cdn/shop/files/GoldenPaste.png?v=1727681550&width=1080',
        variants: [
            { size: '1 Pack', price: 25.00 }
        ],
        tags: ['Supplement', 'Immunity', 'DIY']
    },
    {
        id: 'dp-8',
        name: 'Beef Lung Cubes',
        category: 'Treats',
        description: 'Airy, crunchy cubes of beef lung. Low fat and great for training.',
        benefits: ['Training Treat', 'Low Fat', 'Vitamin Rich'],
        image: 'https://www.depawz.com/cdn/shop/files/BeefLung.png?v=1727681599&width=1080',
        variants: [
            { size: '50g', price: 16.00 },
            { size: '100g', price: 30.00 }
        ],
        tags: ['Training', 'Beef', 'Low Fat']
    },
    {
        id: 'dp-9',
        name: 'Rabbit Ear (Fur-On)',
        category: 'Chews',
        description: 'Natural de-wormer! The fur helps brush the intestinal tract and clean teeth.',
        benefits: ['Natural Dewormer', 'Digestive Aid', 'Dental Cleaning'],
        image: 'https://www.depawz.com/cdn/shop/files/RabbitEar.png?v=1727681650&width=1080',
        variants: [
            { size: '3 pcs', price: 12.00 },
            { size: '5 pcs', price: 19.00 }
        ],
        tags: ['Chew', 'Rabbit', 'Functional']
    }
];
