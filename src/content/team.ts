/**
 * Team bios and photos, sourced in full from the legacy repo's
 * `data/members.ts` (BRAND_EXTRACT.md §5) — every sentence carried over,
 * lightly copy-edited for grammar/consistency only, no information cut.
 * A 7th entry (Nelly Chinonye Ohaeri) was commented out in the legacy file
 * — left out here too until confirmed active.
 */

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  /** Paragraphs, not HTML — legacy stored these as `<br><br>`-joined strings. */
  bio: string[];
};

export const team: TeamMember[] = [
  {
    slug: "gift-ulimma-ohaeri-nwosu",
    name: "Gift Ulimma Ohaeri Nwosu",
    role: "Founder",
    photo: "/profile-images/member-1.jpeg",
    bio: [
      "Gift Ulimma Ohaeri Nwosu is the visionary founder of TrueGems Global Helping Hands Foundation Inc., a registered and approved 501(c)(3) nonprofit organization dedicated to serving vulnerable communities across the United States, Nigeria, and Africa. Born in northern Nigeria and now based in the United States for over a decade, Gift's life has been shaped by witnessing hardship, inequality, and the daily struggles faced by underserved families.",
      "She holds a B.Sc. in History and International Relations from Imo State University and a Master's Degree in Community Development from Bayero University, Kano. After relocating to the United States, her passion for service led her into the healthcare field, where she pursued further education in health and nursing — strengthening her commitment to improving the wellbeing of others.",
      "Gift's humanitarian work began long before TrueGems was formally incorporated in 2025. For more than ten years, she has organized food distributions, supported maternity hospitals, donated essential items, paid school fees for children, and led community health awareness programs. Her compassion and hands-on service laid the foundation for the global mission she leads today.",
      "Under her leadership, TrueGems Global Helping Hands Foundation Inc. has grown into a trusted organization focused on feeding families, improving health literacy, empowering women and children, distributing medical supplies, and strengthening underserved communities. Her vision is rooted in compassion, guided by experience, and driven by the belief that every human being deserves dignity, care, and opportunity.",
      "Gift is happily married and a proud mother of three. Her family remains her greatest source of strength as she continues to expand the organization's global impact. Through her unwavering dedication, she embodies the heart of TrueGems — serving humanity with love, purpose, and a commitment to lasting change.",
    ],
  },
  {
    slug: "chinatu-apolonia-nwokoro",
    name: "Chinatu Apolonia Nwokoro",
    role: "Co-Founder & General Support Lead",
    photo: "/profile-images/member-6.jpeg",
    bio: [
      "Chinatu is a passionate advocate for education, health equality, and community upliftment. She holds a Bachelor's Degree in Education and a Master's Degree in Media and Communication, giving her a strong foundation in human development and effective community engagement.",
      "While living in Ireland, Chinatu actively supported community programs and volunteered in initiatives that promoted inclusion and cultural understanding. She delivered presentations on multicultural Ireland, helping bridge the gap between foreigners and Irish nationals, and spoke on the importance of increasing representation of African women in the country's educational and community sectors. Her work contributed to stronger inclusion, awareness, and support for minority communities.",
      "Chinatu has supported children, families, and underserved groups through humanitarian efforts in both Ireland and Nigeria. Her compassion and belief that everyone deserves the best opportunities in life inspired her to co-found TrueGems Global Helping Hands Foundation.",
      "Today, she serves as the General Support Lead, helping guide programs, strengthen volunteer teams, and expand the foundation's impact across regions. Her dedication continues to shape TrueGems into a beacon of hope for communities in need.",
    ],
  },
  {
    slug: "shulamite-nkeiruka-nwaoze",
    name: "Shulamite Nkeiruka Nwaoze",
    role: "West Africa Regional Coordinator",
    photo: "/profile-images/member-2.jpeg",
    bio: [
      "Shulamite is a Sales Coordinator in the retail and SME segment with a deep passion for community impact and human development. Through her professional journey, she has had the privilege of working closely with diverse communities — especially women, the girl child, and underprivileged groups. These experiences have strengthened her commitment to creating meaningful change wherever she serves.",
      "She believes deeply in the power of empowerment. Every opportunity she has, she uses to support programs that promote personal growth, skill development, and long-term transformation. For her, empowerment is not just an initiative — it is a lifelong mission, a responsibility, and a calling to uplift those whose voices are often unheard.",
      "In addition to her corporate role, she serves as the West Africa Regional Coordinator for TrueGems Global Helping Hands Foundation, where she oversees and coordinates humanitarian outreach across the region — working with teams, volunteers, and community leaders to deliver essential resources, support motherless homes, empower inner-city children, and strengthen underserved communities. Her role allows her to bridge compassion with action, ensuring that every effort contributes to lasting impact.",
      "She is devoted to championing initiatives that transform lives — because when individuals are uplifted, entire communities are transformed.",
    ],
  },
  {
    slug: "hassana-wambai-sani",
    name: "Dr. Hassana Wambai Sani",
    role: "Medical Doctor & Humanitarian Volunteer",
    photo: "/profile-images/member-4.jpeg",
    bio: [
      "Dr. Hassana began her medical journey in Nigeria, where she practiced at the Federal Staff Hospital, Abuja, serving diverse communities with professionalism, empathy, and unwavering commitment. Her work in one of the nation's key federal medical institutions strengthened her clinical expertise and deepened her understanding of the health challenges faced by underserved populations.",
      "She is currently advancing her medical career in the United States, completing her housemanship — a testament to her drive for excellence, continuous learning, and global medical competence. Her ability to adapt, grow, and excel in both Nigerian and American healthcare systems reflects her exceptional dedication to the medical profession.",
      "Beyond her clinical responsibilities, Dr. Hassana volunteers with TrueGems, contributing her medical knowledge, compassion, and leadership to the foundation's health awareness programs, community support initiatives, and efforts to uplift vulnerable children, families, and underserved communities. Her presence strengthens the foundation's mission and brings a professional, compassionate touch to every project she supports.",
      "Dr. Hassana Wambai Sani embodies the spirit of service, healing, and humanity. Her commitment to improving lives — both medically and socially — makes her an inspiring asset to the TrueGems Global Helping Hands Foundation team.",
    ],
  },
  {
    slug: "elelu-shehu",
    name: "Dr. Elelu Shehu",
    role: "Academic Mentor & Community Support Advisor (USA)",
    photo: "/profile-images/member-7.jpeg",
    bio: [
      "Dr. Elelu Shehu is an accomplished Chemistry educator in the United States, serving as an Adjunct Professor with experience teaching at both university and community college levels in Delaware. Known for his strong academic background and dedication to student success, he has taught foundational and advanced chemistry courses that support students in nursing, science, and health-related programs.",
      "As Gift Ulimma Ohaeri Nwosu's Chemistry professor during her nursing studies, Dr. Shehu played a meaningful role in her academic journey. His encouragement, mentorship, and commitment to community service naturally extended into his support for TrueGems.",
      "Today, Dr. Shehu serves as a Community Support Advisor for TrueGems, contributing his expertise, leadership, and passion for educational empowerment. He has been a consistent supporter of the foundation's outreach programs, helping strengthen community engagement and promote opportunities for underserved groups.",
      "Dr. Elelu Shehu is recognized as a dedicated educator, a strong team player, and a valued contributor to the mission of TrueGems Global Helping Hands Foundation.",
    ],
  },
  {
    slug: "henry-emeka-loveday-orji",
    name: "Henry Emeka Loveday Orji",
    role: "Software Developer & International Humanitarian Volunteer",
    photo: "/profile-images/member-5.png",
    bio: [
      "Henry is a passionate full-stack software developer and international volunteer dedicated to using technology as a tool for impact and transformation. As the Website Developer and Technical Support member of TrueGems, he plays a key role in building and maintaining the organization's digital presence, ensuring that its mission reaches and inspires people across the globe.",
      "Henry's journey into technology is driven by more than just code — it is rooted in a deep desire to help people who cannot help themselves and to give others real hope to keep living. He believes that technology, when combined with compassion, can become a powerful force for change in both local and global communities.",
      "In 2022, he was recognized by the La Plage Meta Verse Global Scholars Hall of Fame as a certified International Volunteer, highlighting his commitment to service and global outreach. Beyond his volunteer work, Henry has demonstrated strong leadership and teamwork skills through projects like RideAndRest, where he has taken on key roles in building and managing complex systems, as well as through teaching and supporting others in their learning journeys.",
      "He is deeply passionate about life, spiritual growth, and academic education, with a special focus on empowering children and uplifting the global community. Through his work with TrueGems, Henry continues to combine his technical expertise with his purpose — creating solutions that not only work, but also make a meaningful difference in people's lives.",
    ],
  },
];
