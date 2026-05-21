/**
 * ============================================================
 * FAITH BAPTIST GRANDVIEW — CONTENT STORE
 * ============================================================
 * This is the single file Paul edits to update site copy
 * after launch. No code knowledge required — just change the
 * strings inside the quote marks.
 *
 * If you change something here, save and the site reflects
 * the change automatically.
 *
 * For photos, drop new files into `/public/images/` with the
 * matching filename (or update the path here).
 * ============================================================
 */

export const church = {
  name: 'Faith Baptist Church',
  city: 'Grandview, TN',
  tagline: 'Raw, Genuine Faith in Grandview, TN',
  address: {
    street: '358 Happy Top Road',
    city: 'Grandview',
    state: 'Tennessee',
    zip: '37337',
    country: 'United States',
    mapsLink: 'https://www.google.com/maps/dir//358+Happy+Top+Rd,+Grandview,+TN+37337',
  },
  contact: {
    email: 'faithbaptistgrandview@gmail.com',
    phone: '+1 423-834-1877',
    phoneHref: 'tel:+14238341877',
    facebook: 'https://www.facebook.com/profile.php?id=61587382430656',
    donate: 'https://www.zeffy.com/en-US/donation-form/donate-to-faith-baptist-church',
  },
  serviceTimes: [
    { day: 'Sunday',    time: '10:00 a.m.', label: 'Sunday School' },
    { day: 'Sunday',    time: '11:00 a.m.', label: 'Morning Worship' },
    { day: 'Sunday',    time: '6:00 p.m.',  label: 'Evening Service' },
    { day: 'Wednesday', time: '6:00 p.m.',  label: 'Midweek Service' },
  ],
  /** The two services to highlight in the hero pill (limited space). */
  serviceTimesHero: [
    { day: 'Sunday',    time: '11:00 a.m.', label: 'Morning Worship' },
    { day: 'Sunday',    time: '6:00 p.m.',  label: 'Evening Service' },
  ],
};

/* ============================================================
   SCENE 1 — APPROACH (Hero)
   ============================================================ */
export const scene1 = {
  caption: 'Faith Baptist Church · Grandview, TN',
  headline: 'Jesus can save anyone',
  /* Special-emphasis word from the headline — rendered in italic accent. */
  emphasisWord: 'anyone',
  /* Three CTAs in the hero. */
  ctaPrimary:   { label: 'Plan Your Visit', href: '#visit' },
  ctaSecondary: { label: 'Get Directions',  href: 'https://www.google.com/maps/dir//358+Happy+Top+Rd,+Grandview,+TN+37337' },
  /* Atmospheric reference photo — the actual church sign with the cross
     beside it. Used as a small detail card in the hero corner on desktop. */
  signPhoto: '/images/church/sign-and-cross.jpg',
};

/* ============================================================
   SCENE 2 — THE PROMISE (brand statement)
   ============================================================ */
export const scene2 = {
  pullQuote:
    'Come as you are. God meets us in our messiness, walks with us through it, and works in every part of our lives.',
  body:
    'At Faith Baptist, faith is lived honestly — not polished, not performed. We value honesty, vulnerability, and authenticity. You don\u2019t have to pretend here. We walk together through life\u2019s joys and struggles, trusting that God is at work in all of it.',
  attribution: 'Faith Baptist Church',
  /* The pastor-and-young-man-on-the-porch photo — embodies "we walk
     together." Used as the editorial photo alongside the pull-quote. */
  photo: '/images/church/porch-conversation.jpg',
  photoCaption: 'A conversation on the porch \u2014 Faith Baptist Grandview',
};

/* ============================================================
   SCENE 3 — THE DOORS OPEN (Pastor Justin Dannel's testimony)
   ============================================================ */
export const scene3 = {
  framing: 'From Addict to Ambassador',
  pastor: {
    name: 'Justin Dannel',
    role: 'Pastor',
    photo: '/images/pastor/justin-dannel.jpg',
    photoCaption: 'Pastor Justin Dannel \u2014 Faith Baptist Church',
    testimony: [
      'Hi, my name is Justin Dannel. I was a meth addict for 18 years. I\u2019d been in and out of jail over 20 times, and I\u2019d been homeless at times.',
      'The last time I went to jail, Jesus called me to repentance, and I surrendered my whole life to Him after I got out.',
      'The Lord placed it on my heart to be the man in Mark chapter 5 \u2014 to go home and tell everyone what Jesus had done for me, and to become the evangelist in my community.',
    ],
    scriptureRef: 'Mark 5:18\u201320',
    /* The verse Justin's testimony explicitly references — quoted in
       full at the bottom of Scene 3 as editorial framing. */
    scriptureQuote:
      'Go home to your own people and tell them how much the Lord has done for you, and how he has had mercy on you.',
    scriptureSource: 'Jesus to the healed man \u2014 Mark 5:19',
    /* Pull-quote extracted from the testimony, surfaced large in Scene 3
       as the pivot moment of the story. */
    pullQuote: 'Jesus called me to repentance.',
    /* Secondary photo — Justin holding open Bible, the "now I preach" image. */
    photoSecondary: '/images/pastor/justin-with-bible.jpg',
    photoSecondaryCaption: 'The gospel that saved him \u2014 now preached weekly',
  },
};

/* ============================================================
   SCENE 4 — DOWN THE AISLE (Plan Your Visit)
   ============================================================ */
export const scene4 = {
  headline: 'Plan Your Visit',
  intro:
    'We\u2019d love to host you. Whatever you\u2019re carrying, you\u2019re welcome here. Here\u2019s what to expect your first Sunday.',
  /* The aisle shot — literally a photograph of "down the aisle." */
  photo: '/images/church/sanctuary-aisle.jpg',
  photoCaption: 'Sunday morning, Faith Baptist Grandview',
  firstTime: [
    {
      title: 'What people wear',
      body: 'Whatever you\u2019re comfortable in. Boots, jeans, work clothes, Sunday best \u2014 it\u2019s all welcome. We come as we are.',
    },
    {
      title: 'Parking and the building',
      body: 'There\u2019s open parking out front at 358 Happy Top Road. Walk in the main doors \u2014 someone will greet you and answer any questions.',
    },
    {
      title: 'What the service is like',
      body: 'Singing, prayer, and a sermon rooted directly in Scripture. About an hour. No surprises, no pressure.',
    },
  ],
};

/* ============================================================
   SCENE 5 — AT THE PULPIT (Next Steps + Ministries)
   ============================================================ */
export const scene5 = {
  headline: 'The Life of the Church',
  intro:
    'Beyond Sunday morning, Faith Baptist is a community working out faith together. Three ways to get involved \u2014 and watch sermons anytime on Facebook.',
  /* Atmosphere photo — Justin at the pulpit, cross visible behind.
     Sets the "we are at the pulpit" mood for this scene. */
  atmospherePhoto: '/images/pastor/justin-preaching.jpg',
  atmospherePhotoCaption: 'Pastor Justin Dannel preaching \u2014 Sunday morning',
  ministries: [
    {
      slug: 'youth-bible-quizzing',
      name: 'Youth Bible Quizzing',
      tagline: 'Hiding God\u2019s Word in their hearts.',
      photo: '/images/ministries/youth-bible-quizzing.jpg',
      body: [
        'A year-long discipleship ministry that helps young people grow deeper in God\u2019s Word. Each year, students study an assigned book of the Bible, committing it to heart through regular learning, discussion, and encouragement.',
        'On the third Saturday of every month, youth from participating churches gather at Christian Fellowship Church for friendly competition that tests their knowledge and understanding of Scripture. At the end of the competition, awards are presented to celebrate their hard work, dedication, and spiritual growth \u2014 reminding students that hiding God\u2019s Word in their hearts is a reward that lasts far beyond any trophy.',
      ],
    },
    {
      slug: 'special-sportsman',
      name: 'Special Sportsman of Rhea County',
      tagline: 'Finding the Creator in creation.',
      photo: '/images/ministries/special-sportsman.jpg',
      body: [
        'A hands-on outdoor ministry dedicated to discipling youth through God\u2019s creation. Meeting once a month, the ministry provides real-world experiences in hunting, fishing, camping, trapping, and gun safety \u2014 while teaching responsibility, discipline, and biblical truth.',
        'Following the rhythm of the seasons, participants hunt turkey in the spring, fish and camp in the summer, and hunt deer and trap during the fall and winter. Throughout the year, mentors walk alongside these young people, helping them grow in character, skill, and faith as they learn to see the Creator through His creation.',
        'Partnered with Awakening Adventures, a Christian wildlife sanctuary and camp.',
      ],
      donateUrl: 'https://www.zeffy.com/en-US/donation-form/donate-to-special-sportsman-of-rhea-county',
      donateLabel: 'Support Special Sportsman',
    },
    {
      slug: 'homeless-outreach',
      name: 'Homeless Outreach',
      tagline: 'Compassion in action, October through March.',
      photo: '/images/ministries/homeless-outreach.jpg',
      body: [
        'Faith Baptist Church\u2019s Homeless Outreach Ministry serves those experiencing homelessness in our surrounding communities with compassion and care. From October through March, our church goes out once a month to local homeless camps to distribute food.',
        'In December, we also provide essential supplies and help connect individuals with helpful resources. Beyond meeting immediate needs, this ministry seeks to share the love of Christ and the gospel by building genuine relationships through service.',
      ],
    },
  ],
  sermonArchive: {
    label: 'Watch Sermons on Facebook',
    href: 'https://www.facebook.com/profile.php?id=61587382430656',
  },
};

/* ============================================================
   SCENE 6 — FACING THE DOORS (Contact + Footer)
   ============================================================ */
export const scene6 = {
  sendingLine:
    'Go home and tell everyone what Jesus has done for you.',
  sendingAttribution: 'Mark 5:19',
  contactHeadline: 'Reach out, even if it\u2019s just to say hi.',
  /* Building exterior photo — closes the loop. Visitor saw the 3D
     church in Scene 1; we close by showing the real building.
     The dream becomes the place. */
  closingPhoto: '/images/church/exterior.jpg',
  closingPhotoCaption: 'Faith Baptist Church \u2014 358 Happy Top Road, Grandview, Tennessee',
};

/* ============================================================
   STATEMENT OF FAITH — scraped from current /about-us page
   ============================================================
   Faith Baptist's full doctrinal statement: 9 articles with
   scripture references. Used in Scene 6 collapsible accordion +
   standalone /statement-of-faith page + /about-us page.
   ============================================================ */
export const beliefs = {
  preamble:
    'We invite you to explore our beliefs and join us in our pursuit of living out our faith in boldness and passion.',
  articles: [
    {
      heading: 'The Bible',
      body: 'We believe the Holy Bible is the inspired, true, and authoritative Word of God, given by the Holy Spirit, and is our final authority for faith, doctrine, and how we live.',
      scripture: '2 Timothy 3:16\u201317 \u00b7 Psalm 19:7 \u00b7 2 Peter 1:20\u201321',
    },
    {
      heading: 'God',
      body: 'We believe in one true and living God, who exists eternally as Father, Son, and Holy Spirit \u2014 equal in power and glory.',
      scripture: 'Deuteronomy 6:4 \u00b7 Matthew 28:19 \u00b7 2 Corinthians 13:14',
    },
    {
      heading: 'Jesus Christ',
      body: 'We believe Jesus Christ is the Son of God, fully God and fully man, born of a virgin, who lived without sin, died on the cross for our sins, rose bodily from the dead, and now reigns as Lord. He is the only way to the Father.',
      scripture: 'John 1:1, 14 \u00b7 Isaiah 7:14 \u00b7 1 Corinthians 15:3\u20134 \u00b7 Acts 4:12',
    },
    {
      heading: 'Salvation',
      body: 'We believe salvation is by God\u2019s grace alone, through faith in Jesus Christ, not by our own works. All who repent and trust in Christ are forgiven, made new, and given eternal life.',
      scripture: 'Ephesians 2:8\u20139 \u00b7 Romans 10:9\u201310 \u00b7 Acts 3:19 \u00b7 2 Corinthians 5:17',
    },
    {
      heading: 'The Holy Spirit',
      body: 'We believe the Holy Spirit convicts the world of sin, leads people to Christ, lives in every believer, and empowers us to live holy lives and serve God.',
      scripture: 'John 16:8 \u00b7 Romans 8:9\u201311 \u00b7 Galatians 5:22\u201323 \u00b7 Acts 1:8',
    },
    {
      heading: 'The Church',
      body: 'We believe the Church is the body of Christ, made up of all believers, and that local churches exist to worship God, teach the Word, encourage one another, and share the gospel.',
      scripture: '1 Corinthians 12:27 \u00b7 Hebrews 10:24\u201325 \u00b7 Matthew 28:19\u201320',
    },
    {
      heading: 'Baptism and the Lord\u2019s Supper',
      body: 'We believe Jesus commanded believers to be baptized and to remember Him through the Lord\u2019s Supper as acts of obedience and worship.',
      scripture: 'Matthew 28:19 \u00b7 Romans 6:3\u20134 \u00b7 Luke 22:19 \u00b7 1 Corinthians 11:23\u201326',
    },
    {
      heading: 'Christian Living',
      body: 'We believe followers of Jesus are called to love God, love others, turn away from sin, and live in obedience to God\u2019s Word by the power of the Holy Spirit.',
      scripture: 'Matthew 22:37\u201339 \u00b7 Romans 12:1\u20132 \u00b7 John 14:15 \u00b7 Micah 6:8',
    },
    {
      heading: 'The Return of Christ and Eternity',
      body: 'We believe Jesus Christ will return, the dead will be raised, and God will judge all people. Those who belong to Christ will live with Him forever, and those who reject Him will face eternal separation from God.',
      scripture: 'John 14:3 \u00b7 1 Thessalonians 4:16\u201317 \u00b7 Revelation 20:11\u201315',
    },
  ],
};

/* ============================================================
   VALUES — eight values that shape Faith Baptist's life
   ============================================================ */
export const values = {
  preamble:
    'We are committed to living out the values of the gospel of Jesus Christ. Our mission is to love God, love others, and share the good news of Jesus Christ.',
  items: [
    { name: 'Scripture Centered', body: 'We value reading, trusting, and obeying the Bible as the foundation for our faith and daily lives.' },
    { name: 'Authentic Worship',  body: 'We value worshipping God sincerely and honoring Him in every part of life.' },
    { name: 'Christ Focused',     body: 'We value keeping Jesus at the center of everything we believe and do.' },
    { name: 'Gospel Sharing',     body: 'We value sharing the good news of Jesus Christ with our community and the world.' },
    { name: 'Church Community',   body: 'We value loving one another and building meaningful relationships within the church.' },
    { name: 'Spiritual Growth',   body: 'We value growing in our understanding of Scripture and helping one another mature in faith.' },
    { name: 'Faithful Living',    body: 'We value living lives that reflect the character and teachings of Jesus Christ.' },
    { name: 'Hopeful Future',     body: 'We value living with hope and faith as we look forward to the return of Jesus and the fulfillment of God\u2019s kingdom.' },
  ],
};

/* ============================================================
   MISSION STATEMENT — the church's own words for why they exist
   ============================================================ */
export const mission = {
  headline: 'Healing Through God\u2019s Love',
  body:
    'Life in a small town comes with its own joys and struggles. We believe God\u2019s love has the power to bring healing to broken hearts, strained relationships, and weary souls. At Faith Baptist, we point people to the One who restores and makes whole. His love changes everything.',
};

/* ============================================================
   NAVIGATION
   ============================================================ */
export const nav = {
  links: [
    { label: 'Visit',      href: '/#visit' },
    { label: 'About',      href: '/about-us' },
    { label: 'Ministries', href: '/#ministries' },
    { label: 'Sermons',    href: 'https://www.facebook.com/profile.php?id=61587382430656', external: true },
    { label: 'Give',       href: 'https://www.zeffy.com/en-US/donation-form/donate-to-faith-baptist-church', external: true },
  ],
};

/* ============================================================
   SEO METADATA
   ============================================================ */
export const meta = {
  title: 'Faith Baptist Church | Jesus can Save You | Grandview, TN',
  description:
    'A small country church in Grandview, Tennessee. Pastor Justin Dannel preaches the gospel that delivered him from 18 years of meth addiction. Come as you are. Sundays 11 a.m. and 6 p.m.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
  canonical: 'https://www.faithbaptistgrandview.com',
};
