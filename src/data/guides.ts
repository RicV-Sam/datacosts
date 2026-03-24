import { Guide } from '../types';

/**
 * These guides are implemented but not currently featured in the main navigation or sitemap.
 * Kept for potential future use or long-tail SEO expansion.
 */
export const secondaryGuides: Guide[] = [
  {
    slug: 'how-to-buy-data-vodacom',
    title: 'How to Buy Data on Vodacom - USSD Codes & App Guide 2026',
    metaDescription: 'Learn how to buy data on Vodacom using USSD codes, the MyVodacom app, and airtime conversion. Find the fastest way to get connected on SA\'s biggest network.',
    h1: 'How to Buy Data on Vodacom: Step-by-Step Guide',
    intro: 'Vodacom offers several ways to purchase data bundles, whether you are looking for a quick daily fix or a large monthly allocation. The most common method is using USSD codes, which work even if you don\'t have an active data connection. This guide covers all the ways you can buy Vodacom data bundles in seconds.',
    comparisonType: 'all',
    stepsTitle: '3 Ways to Buy Vodacom Data',
    steps: [
      {
        title: 'Option 1: Using USSD Codes (Fastest)',
        description: 'Dial *135# from your Vodacom SIM. Select "Buy" (usually option 2), then select "Data". Follow the prompts to choose your bundle size and validity period.'
      },
      {
        title: 'Option 2: Just4You Personalised Deals',
        description: 'Dial *123# to access "Just4You" deals. These are often significantly cheaper than standard bundles and are tailored to your usage patterns.'
      },
      {
        title: 'Option 3: Using the MyVodacom App',
        description: 'Open the MyVodacom app, tap "Buy Bundles", and select "Data". The app often features exclusive "App-only" deals that you won\'t find on USSD.'
      }
    ],
    faq: [
      {
        question: 'What is the USSD code to buy Vodacom data?',
        answer: 'The primary USSD code is *135#. You can also use *123# for personalized Just4You deals.'
      },
      {
        question: 'Can I buy Vodacom data for someone else?',
        answer: 'Yes, dial *135#, select "Buy", choose "Data", and then look for the option to "Purchase for another number".'
      },
      {
        question: 'How do I check my Vodacom data balance?',
        answer: 'Dial *135# and select "Balances" or simply dial *136# for a quick summary.'
      },
      {
        question: 'How long do Vodacom data bundles last?',
        answer: 'Validity depends on the bundle: Hourly (1 hour), Daily (expires at midnight), Weekly (7 days), or Monthly (30 days).'
      },
      {
        question: 'Is there a cheap 1GB bundle on Vodacom?',
        answer: 'Yes, Vodacom often offers 1GB "Daily" or "Weekly" bundles for under R50, while a standard 30-day 1GB bundle is usually around R85-R99.'
      }
    ]
  },
  {
    slug: 'how-to-buy-data-mtn',
    title: 'How to Buy Data on MTN - USSD Codes & MTN App Guide 2026',
    metaDescription: 'Step-by-step guide on how to buy MTN data bundles using USSD codes like *136*2# and the MTN app. Get the best MTN Boosta and personalized deals.',
    h1: 'How to Buy Data on MTN: Easy USSD & App Methods',
    intro: 'MTN is known for its high-speed network and wide variety of data options. Whether you need a small WhatsApp bundle or a massive 100GB package, MTN makes it easy to recharge using your airtime. This guide will show you the exact USSD codes and steps needed to buy MTN data bundles quickly.',
    comparisonType: 'all',
    stepsTitle: 'How to Purchase MTN Data Bundles',
    steps: [
      {
        title: 'Method 1: The Standard USSD Code',
        description: 'Dial *136*2# on your phone. This will take you directly to the data bundle selection menu where you can choose between Daily, Weekly, and Monthly options.'
      },
      {
        title: 'Method 2: MTN Pulse (For Youth)',
        description: 'If you are under 25, dial *411# to join MTN Pulse. This gives you access to exclusive, ultra-cheap data deals like 500MB for R10.'
      },
      {
        title: 'Method 3: MTN Boosta & Personalised Deals',
        description: 'Dial *142# to see "Boosta" deals. These are promotional offers that provide much better value than the standard data menu.'
      }
    ],
    faq: [
      {
        question: 'What is the USSD code for MTN data?',
        answer: 'The main code is *136*2#. You can also use the general menu at *136#.'
      },
      {
        question: 'How do I buy 1GB on MTN?',
        answer: 'Dial *136*2#, select "Monthly", and choose the 1GB option. Alternatively, check *142# for a cheaper "Boosta" 1GB deal.'
      },
      {
        question: 'Can I use my airtime to buy MTN data?',
        answer: 'Yes, as long as you have enough airtime balance, the cost of the data bundle will be deducted from your airtime automatically.'
      },
      {
        question: 'How do I check MTN data balance?',
        answer: 'Simply dial *136*1# or use the MTN app for a detailed breakdown of your remaining data.'
      },
      {
        question: 'Does MTN have unlimited data?',
        answer: 'MTN offers "Uncapped" plans, but they usually come with a Fair Usage Policy (FUP) that reduces your speed after you reach a certain limit.'
      }
    ]
  },
  {
    slug: 'how-to-check-data-balance',
    title: 'How to Check Data Balance South Africa - All Networks (2026)',
    metaDescription: 'Never run out of data! Learn the USSD codes to check your data balance on Vodacom, MTN, Telkom, and Cell C instantly from your phone.',
    h1: 'How to Check Your Data Balance (All SA Networks)',
    intro: 'Running out of data in the middle of a task is frustrating. In South Africa, every network provides a free USSD code that allows you to check your remaining data balance in seconds. This guide lists the official codes for Vodacom, MTN, Telkom, and Cell C so you can always stay on top of your usage.',
    comparisonType: 'all',
    stepsTitle: 'USSD Balance Codes by Operator',
    steps: [
      {
        title: 'Check Vodacom Balance',
        description: 'Dial *136# for a quick summary or *135# and select "Balances" for a detailed view of your data, airtime, and SMS bundles.'
      },
      {
        title: 'Check MTN Balance',
        description: 'Dial *136*1# to see your data and airtime balances instantly on your screen.'
      },
      {
        title: 'Check Telkom Balance',
        description: 'Dial *188# to receive an instant pop-up or SMS showing your Anytime and Night-Owl data balances.'
      },
      {
        title: 'Check Cell C Balance',
        description: 'Dial *101# or *147# to view your remaining data and airtime.'
      }
    ],
    faq: [
      {
        question: 'Is it free to check my data balance?',
        answer: 'Using USSD codes like *136# or *188# is completely free on all South African mobile networks.'
      },
      {
        question: 'Why is my data balance not updating?',
        answer: 'There is sometimes a small delay (a few minutes) between using data and it reflecting on the USSD menu. Try restarting your phone or waiting 5 minutes.'
      },
      {
        question: 'Can I check my balance on a router?',
        answer: 'Yes, you can log in to your router\'s web interface (usually 192.168.8.1) or use the network\'s app on your phone if it is linked to the router\'s SIM.'
      },
      {
        question: 'What is "Night Owl" data balance?',
        answer: 'This is a separate data balance that can only be used between midnight (00:00) and 05:00 AM. Your regular Anytime data won\'t be used during these hours.'
      },
      {
        question: 'How do I see which apps are using my data?',
        answer: 'On Android: Go to Settings > Network & Internet > Data Usage. On iPhone: Go to Settings > Mobile Data.'
      }
    ]
  },
  {
    slug: 'why-is-my-data-finishing-so-fast',
    title: 'Why is My Data Finishing So Fast? 5 Tips to Save Data in SA',
    metaDescription: 'Is your data disappearing too quickly? Discover why your data is finishing so fast and learn 5 simple ways to reduce usage on Vodacom, MTN, and Telkom.',
    h1: 'Why is My Data Finishing So Fast? (Solved)',
    intro: 'It is a common frustration in South Africa: you buy a 1GB bundle, and just a few days (or hours) later, it is gone. High-quality video, background updates, and "data-hungry" social media apps are usually the culprits. This guide explains exactly where your data is going and how you can stop the "data leak" today.',
    comparisonType: 'all',
    stepsTitle: '5 Ways to Stop Your Data Disappearing',
    steps: [
      {
        title: 'Disable Auto-Play on Social Media',
        description: 'Facebook, Instagram, and TikTok auto-play videos by default. Go into the settings of each app and set videos to "Never Auto-play" or "Wi-Fi Only".'
      },
      {
        title: 'Turn Off Background App Refresh',
        description: 'Many apps use data even when you aren\'t using them. Go to your phone settings and disable "Background App Refresh" for non-essential apps.'
      },
      {
        title: 'Change YouTube Video Quality',
        description: 'Watching a video in 1080p (HD) uses 4x more data than 480p (Standard Definition). Manually set your quality to 480p to save significant data.'
      },
      {
        title: 'Limit Cloud Syncing (Google Photos/iCloud)',
        description: 'Your phone might be uploading every photo and video you take to the cloud instantly. Set your backup settings to "Wi-Fi Only".'
      },
      {
        title: 'Check for Software Updates',
        description: 'System updates can be several Gigabytes in size. Ensure your phone is set to "Update over Wi-Fi only" in your system settings.'
      }
    ],
    faq: [
      {
        question: 'Does WhatsApp use a lot of data?',
        answer: 'Texting uses very little data, but sending/receiving photos, videos, and voice notes can add up. Turn off "Media Auto-Download" in WhatsApp settings.'
      },
      {
        question: 'Does TikTok use more data than YouTube?',
        answer: 'Yes, TikTok is highly optimized for high-quality video and auto-playing content, which can consume data much faster than traditional browsing.'
      },
      {
        question: 'Why does my phone use data when I am on Wi-Fi?',
        answer: 'Feature like "Wi-Fi Assist" (iPhone) or "Network Acceleration" (Android) might switch back to mobile data if your Wi-Fi signal is weak. Turn these off in settings.'
      },
      {
        question: 'How much data does Netflix use?',
        answer: 'On low quality, Netflix uses about 300MB per hour. On High/4K quality, it can use up to 7GB per hour.'
      },
      {
        question: 'Can a virus cause data loss?',
        answer: 'Yes, some malicious apps can run in the background and send data to external servers. If your usage is unexplained, check your "Data Usage" settings for unfamiliar apps.'
      }
    ]
  }
];

export const guides: Guide[] = [
  {
    slug: 'cheapest-1gb-data-south-africa',
    title: 'Cheapest 1GB Data South Africa 2026 - Best Prices Compared',
    metaDescription: 'Find the absolute cheapest 1GB data bundle in South Africa. Compare Vodacom, MTN, Telkom, and Cell C for the best monthly and prepaid data deals.',
    h1: 'Cheapest 1GB Data in South Africa: 2026 Comparison',
    intro: 'If you are looking for the cheapest 1GB data bundle in South Africa, you have come to the right place. Data costs are constantly changing, with networks like Telkom and MTN often leading the pack in value. In this guide, we break down the current prices for 1GB bundles across all major mobile operators to help you save money on your next recharge.',
    comparisonType: '1gb',
    stepsTitle: 'How to Find the Best 1GB Deal',
    steps: [
      {
        title: 'Check for Promotional Bundles',
        description: 'Networks often have "Boosta" or "Mo\'Nice" deals that are significantly cheaper than standard 1GB bundles. Always dial the USSD menu to see your personalized offers.'
      },
      {
        title: 'Compare Anytime vs. Night Data',
        description: 'Some "1GB" bundles are actually 500MB Anytime and 500MB Night-Owl. Ensure you are getting 1GB of Anytime data if that is what you need.'
      },
      {
        title: 'Look at Validity Periods',
        description: 'A 1GB bundle that lasts 30 days is usually more expensive than one that lasts only 24 hours or 7 days. Buy for the duration you actually need.'
      }
    ],
    faq: [
      {
        question: 'Which network has the cheapest 1GB data?',
        answer: 'Currently, Telkom and MTN (via Boosta deals) typically offer the cheapest 1GB bundles in South Africa, often priced between R79 and R99 for a standard 30-day bundle, or much less for shorter validity.'
      },
      {
        question: 'Is 1GB of data enough for a month?',
        answer: '1GB is usually enough for basic WhatsApp, occasional emailing, and light browsing. However, it will finish quickly if you watch YouTube videos or use TikTok frequently.'
      },
      {
        question: 'How do I buy 1GB on Vodacom?',
        answer: 'Dial *135#, select "Buy", then "Data", and look for the Monthly or Weekly 1GB options.'
      },
      {
        question: 'Does MTN have a R99 1GB bundle?',
        answer: 'Yes, MTN often has a standard 1GB bundle for around R99, but they frequently offer 1GB "Daily" or "Weekly" deals for much less (R20 - R50).'
      },
      {
        question: 'Can I get free 1GB data?',
        answer: 'Some networks offer free data when you first join or via their rewards apps (like MyVodacom or MTN App). Check your network app for current promotions.'
      }
    ]
  },
  {
    slug: 'cheap-night-data-south-africa',
    title: 'Cheap Night Data South Africa 2026: Best Night Owl Bundles',
    metaDescription: 'Discover the cheapest night data bundles in South Africa. Compare MTN Night Express, Vodacom Night Owl, and Telkom night data deals to save big.',
    h1: 'Cheap Night Data South Africa: Best Night Owl Bundles',
    intro: 'Night data, often called "Night Owl" or "Midnight" data, is one of the most cost-effective ways to download large files, update apps, or stream content in South Africa. Major networks like MTN, Vodacom, Telkom, and Cell C offer massive data allocations that can only be used during off-peak hours (usually 12 AM to 5 AM). If you are looking for the absolute lowest cost per GB, night data is your best bet.',
    comparisonType: 'night',
    stepsTitle: 'How to Maximise Your Night Data',
    steps: [
      {
        title: 'Check Your Network\'s Specific Times',
        description: 'While most "Night Owl" periods run from 00:00 to 05:00, some promotional bundles might have different hours. Always verify before starting a big download.'
      },
      {
        title: 'Schedule Your Downloads',
        description: 'Use download managers or app settings (like in Netflix or YouTube) to schedule high-bandwidth tasks for after midnight to ensure they use your night balance.'
      },
      {
        title: 'Monitor Your Balance',
        description: 'Ensure you have a small amount of Anytime data or airtime available. If your night data runs out, some networks might stop your session, while others might start billing your Anytime balance.'
      }
    ],
    faq: [
      {
        question: 'When does night data start and end?',
        answer: 'For most South African networks like Vodacom and MTN, night data is valid between 00:00 (midnight) and 05:00 AM.'
      },
      {
        question: 'Which network has the best night data?',
        answer: 'Telkom is traditionally famous for its massive night data allocations, but MTN\'s Night Express and Vodacom\'s Night Owl bundles are highly competitive, especially in promotional deals.'
      },
      {
        question: 'Does night data work on 5G?',
        answer: 'Yes, night data bundles work on 5G, 4G, and LTE networks, provided you have a compatible device and coverage.'
      },
      {
        question: 'What happens if I use data after 5 AM?',
        answer: 'Any data usage after the night period ends (usually 05:00 AM) will be deducted from your Anytime data balance or your airtime at out-of-bundle rates.'
      },
      {
        question: 'Can I use night data for YouTube or Netflix?',
        answer: 'Absolutely. Night data can be used for any internet activity, making it perfect for high-quality video streaming during off-peak hours.'
      }
    ]
  },
  {
    slug: 'convert-airtime-to-data-south-africa',
    title: 'How to Convert Airtime to Data South Africa (All Networks)',
    metaDescription: 'Learn how to convert airtime to data on Vodacom, MTN, Telkom, and Cell C. Save money by avoiding expensive out-of-bundle data rates.',
    h1: 'How to Convert Airtime to Data in South Africa',
    intro: 'One of the most common questions for South African mobile users is how to turn prepaid airtime into a data bundle. Buying data directly with airtime is usually much cheaper than using "out-of-bundle" rates, which can drain your balance in minutes. This guide provides the exact USSD codes and steps to convert your airtime on Vodacom, MTN, Telkom, and Cell C.',
    comparisonType: 'all',
    stepsTitle: 'USSD Codes to Convert Airtime to Data',
    steps: [
      {
        title: 'Vodacom: Convert Airtime',
        description: 'Dial *135# from your phone. Select "Buy" (option 2), then "Data". Choose your preferred bundle size and validity, and select "Airtime" as your payment method.'
      },
      {
        title: 'MTN: Convert Airtime',
        description: 'Dial *136*2# to go straight to the data menu. You can also dial *136# and follow the prompts to "Buy" and then "Data Bundles".'
      },
      {
        title: 'Telkom: Convert Airtime',
        description: 'Dial *180#. Follow the menu to purchase data bundles using your existing airtime balance.'
      },
      {
        title: 'Cell C: Convert Airtime',
        description: 'Dial *147# or *101# and follow the prompts to buy data bundles from your airtime.'
      }
    ],
    faq: [
      {
        question: 'Is it cheaper to buy data or use airtime directly?',
        answer: 'It is always significantly cheaper to buy a data bundle. Out-of-bundle airtime rates can be as high as R2 per MB, while bundles can cost less than R0.10 per MB.'
      },
      {
        question: 'Can I reverse a data purchase?',
        answer: 'Generally, once you have converted airtime to data, the transaction cannot be reversed. Always double-check the bundle size before confirming.'
      },
      {
        question: 'How long does converted data last?',
        answer: 'The validity depends on the bundle you choose: from 1 hour and 1 day to 30 days or even longer.'
      },
      {
        question: 'Can I convert airtime to data for someone else?',
        answer: 'Yes, most networks allow you to choose "Purchase for another number" within the USSD menus after you select the bundle you want to buy.'
      },
      {
        question: 'Why did my airtime disappear even though I had data?',
        answer: 'This often happens if you have "Out-of-Bundle" billing enabled and your data bundle expires or runs out while you are still using the internet.'
      }
    ]
  },
  {
    slug: 'best-data-deals-south-africa',
    title: 'Best Data Deals South Africa 2026: Top Value Bundles Compared',
    metaDescription: 'Find the best data deals in South Africa. We compare Vodacom Just4You, MTN Boosta, and Telkom Mo\'Nice to find you the most data for your money.',
    h1: 'Best Data Deals in South Africa 2026: Top Value Bundles',
    intro: 'Finding the best data deals in South Africa requires looking beyond the standard monthly bundles. From "Just4You" on Vodacom to "MTN Boosta" and Telkom\'s "Mo\'Nice," there are dozens of hidden promotions that offer significantly better value than what you see on a recharge voucher. We have compared the latest offers to find the best value for every type of user.',
    comparisonType: 'best-value',
    stepsTitle: 'How to Access "Hidden" Data Deals',
    steps: [
      {
        title: 'Use Personalised USSD Menus',
        description: 'Check *123# on Vodacom, *142# on MTN, and *123# on Telkom for deals tailored specifically to your usage patterns. These are often the best value in the country.'
      },
      {
        title: 'Download the Network Apps',
        description: 'Apps like MyVodacom and MyMTN frequently offer "App-only" specials, such as double-data or heavily discounted 1GB bundles that aren\'t available via USSD.'
      },
      {
        title: 'Look for New Player Deals',
        description: 'Smaller or newer providers like Rain or Melon Mobile often have aggressive pricing to attract new customers. Always check if a new SIM might save you money.'
      }
    ],
    faq: [
      {
        question: 'Which network currently has the best data deals?',
        answer: 'It varies monthly, but Telkom and Rain are consistently price leaders. However, MTN and Vodacom often beat them on value through personalized "Boosta" or "Just4You" offers.'
      },
      {
        question: 'What are "Personalised Deals"?',
        answer: 'These are promotional data offers created by networks using AI to analyze your usage. They offer more data for less money than standard "off-the-shelf" bundles.'
      },
      {
        question: 'Are weekly bundles better than monthly ones?',
        answer: 'Frequently, yes. If you can manage your usage, buying four weekly bundles can sometimes give you more total data for less money than one 30-day bundle.'
      },
      {
        question: 'How do I get 5G data deals?',
        answer: 'Most modern data bundles from Vodacom, MTN, and Telkom automatically include 5G access at no extra cost, provided you have a 5G phone and are in a 5G area.'
      },
      {
        question: 'Is Rain really unlimited?',
        answer: 'Rain offers several "Unlimited" plans. While they don\'t have a data cap, they do have different speed tiers (e.g., 10Mbps vs 30Mbps vs 5G) and can be affected by network congestion.'
      }
    ]
  },
  {
    slug: 'prepaid-vs-contract-south-africa',
    title: 'Prepaid vs. Contract South Africa: Which is Cheaper in 2026?',
    metaDescription: 'Choosing between prepaid and contract? We compare the costs, flexibility, and data rates of prepaid vs contract in SA to find the best option for you.',
    h1: 'Prepaid vs. Contract in South Africa: Which is Cheaper?',
    intro: 'Choosing between a prepaid SIM and a long-term contract is a major financial decision for many South Africans. While contracts often offer a "free" smartphone, prepaid gives you total control over your spending without being locked into a 24-month commitment. In this guide, we weigh the pros and cons of both options to help you decide which is better for your wallet.',
    comparisonType: 'all',
    stepsTitle: 'Comparison at a Glance',
    steps: [
      {
        title: 'Prepaid: Pros & Cons',
        description: 'Pros: Total cost control, no credit check, access to promo deals. Cons: You must buy your own phone upfront, out-of-bundle rates can be high if you aren\'t careful.'
      },
      {
        title: 'Contract: Pros & Cons',
        description: 'Pros: Lower upfront cost for new phones, reliable monthly data allocation. Cons: 24-36 month lock-in, harder to change networks, credit check required.'
      },
      {
        title: 'The "SIM-Only" Middle Ground',
        description: 'Many networks now offer month-to-month SIM-only contracts. These give you the better data rates of a contract without the long-term commitment or phone cost.'
      }
    ],
    faq: [
      {
        question: 'Is prepaid cheaper than a contract?',
        answer: 'If you already own your phone, prepaid is almost always cheaper because you can take advantage of "Boosta" and other promotional data deals that aren\'t available to contract users.'
      },
      {
        question: 'Can I switch from contract to prepaid?',
        answer: 'Yes, but usually only after your contract term (24 or 36 months) has ended. You may need to give one month\'s notice to your provider.'
      },
      {
        question: 'What are the benefits of a SIM-only contract?',
        answer: 'SIM-only contracts offer the convenience of a monthly bill and often better "base" data rates than standard prepaid, without the high cost of financing a device.'
      },
      {
        question: 'Do contracts have better data rates?',
        answer: 'Standard contract data rates are often lower than standard prepaid rates, but prepaid "Personalised Deals" (*123#/*142#) are often the cheapest in the market.'
      },
      {
        question: 'What is a "Hybrid" or "Top-up" contract?',
        answer: 'This is a contract with a fixed monthly cost that gives you a set amount of data/airtime. Once that is used, you can "top up" with prepaid airtime, giving you the best of both worlds.'
      }
    ]
  }
];
