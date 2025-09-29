import Read from "../../Assets/BlogPageAssets/read.svg";
import Line from "../../Assets/BlogPageAssets/line.svg";

// Helper: Generate slug from title
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

export const blogPosts = [
  {
    id: 1,
    slug: slugify("5 Habits of a Grounded Leader"),
    image:
      "https://res.cloudinary.com/dklslzrkg/image/upload/v1758933100/blog1_tklw5c.png",
    detailImage:
      "https://res.cloudinary.com/dklslzrkg/image/upload/v1758954767/detail1_wmg9ul.png",
    date: "Sept 23, 2025",
    isoDate: "2025-09-23",
    readTime: "5 min read",
    title: "5 Habits of a Grounded Leader",
    description:
      "In a fast-paced world where leadership is often mistaken for titles, influence, or authority, truly grounded leaders stand out...",
    content: `
      <p>In a fast-paced world where leadership is often mistaken for titles, influence, or authority, truly grounded leaders stand out. They lead with balance, authenticity, and depth, creating stability for themselves and those they guide. Grounded leaders are not swayed by every wave of change; instead, they inspire confidence by anchoring their actions in timeless values.</p>

      <ol class="blog-list">
        <h3 class="bold-blog-text">Here are five key habits they embody:</h3>
        <li class="blog-list"><span class="semi-bold-blog-text">1. Practicing Self-Awareness.</span> 
            <p>Grounded leaders take time to reflect, assess, and understand themselves. They are conscious of their strengths, blind spots, and triggers. Through journaling, mindfulness, or feedback, they stay connected to their inner compass, ensuring their leadership flows from clarity rather than ego.</p>
        </li>
        <li class="blog-list"><span class="semi-bold-blog-text">2. Leading with Consistency.</span> 
            <p>Trust is built when people know what to expect from you. Grounded leaders demonstrate consistency—in their words, actions, and decisions. They don’t shift with every trend or pressure; instead, they model reliability that reassures their teams and communities.</p>
        </li>
        <li class="blog-list"><span class="semi-bold-blog-text">3. Listening Deeply.</span> 
            <p>Leadership is not only about speaking vision but also about listening with intention. Grounded leaders cultivate the habit of listening—beyond words—to understand people’s perspectives, emotions, and aspirations. This practice creates stronger relationships and fosters inclusivity.</p>
        </li>
        <li class="blog-list"><span class="semi-bold-blog-text">4. Staying Rooted in Values.</span> 
            <p>While strategies may change, values remain constant. Grounded leaders anchor their choices in clear personal and organizational values. Whether faced with opportunity or challenge, they filter decisions through these values, maintaining integrity even when it is costly.</p>
        </li>
        <li class="blog-list"><span class="semi-bold-blog-text">5. Embracing Humility.</span> 
            <p>Grounded leaders know leadership is not about being the loudest voice in the room but about lifting others. They remain teachable, celebrate their teams, and recognize that no one has all the answers. Their humility makes them approachable and inspires loyalty.</p>
        </li>
      </ol>

      <div class="blog-list">
        <span class="semi-bold-blog-text">Final Thought:</span>
        <p class="normal-blog-text">
          Grounded leadership is not about perfection—it’s about presence, balance, and authenticity. Leaders who cultivate these habits don’t just achieve results; they build legacies that last because they touch both hearts and minds.
        </p>
      </div>
    `,
    divider: Line,
    icon: Read,
    category: "Leadership",
    popularity: 120,
  },
  {
    id: 2,
    slug: slugify("The Art of Mindful Living"),
    image:
      "https://res.cloudinary.com/dklslzrkg/image/upload/v1758933100/blog2_bv5bqa.png",
    detailImage:
      "https://res.cloudinary.com/dklslzrkg/image/upload/v1758954766/detail2_i2w38o.png",
    date: "Sept 23, 2025",
    isoDate: "2025-09-23",
    title: "The Art of Mindful Living",
    description:
      "In our busy, always-on world, it’s easy to slip into autopilot rushing through tasks, juggling responsibilities, and barely pausing to breathe...",
    content: `
      <p>In our busy, always-on world, it’s easy to slip into autopilot—rushing through tasks, juggling responsibilities, and barely pausing to breathe. Yet, there’s an alternative way of life that offers balance, clarity, and peace: mindful living. More than a trend, mindful living is an intentional art of being present in each moment, cultivating awareness, and choosing to experience life fully.</p>
      
      <div class="blog-list">
        <span class="semi-bold-blog-text">What Does Mindful Living Mean?</span>
        <p class="normal-blog-text">
          At its core, mindful living is about paying attention. It’s noticing the little details—the warmth of your morning coffee, the sound of laughter, the feel of the wind on your skin—without being pulled into the past or future. It invites us to slow down and engage deeply with what matters.
        </p>
      </div>
      
      <div class="blog-list">
        <span class="semi-bold-blog-text">
        What Matters</span>
        <p class="normal-blog-text">
          When we live mindfully, we reduce stress and anxiety, improve focus, and strengthen our relationships. Instead of reacting impulsively, we respond with clarity. Mindful living allows us to align our daily choices with our values, making life more meaningful and intentional.
        </p>
      </div>

      <ol class="blog-list">
        <h3 class="bold-blog-text">How to Practice the Art of Mindful Living</h3>
        <li class="blog-list"><span class="semi-bold-blog-text">1. Start with Your Breath</span> 
            <p>Pause at different points in the day to take slow, intentional breaths. It grounds you in the present.</p>
        </li>
        <li class="blog-list"><span class="semi-bold-blog-text">2. Savor Daily Moments</span> 
            <p>
              Eat slowly, listen attentively, and notice details in your environment. Simple activities can become mindful rituals.
            </p>
        </li>
        <li class="blog-list"><span class="semi-bold-blog-text">3. Limit Distractions</span> 
            <p>Put away your phone during conversations or meals. Give your full attention to the person or task before you.</p>
        </li>
        <li class="blog-list"><span class="semi-bold-blog-text">4. Practice Gratitude</span> 
            <p>Reflect on what you’re thankful for. Gratitude shifts your perspective and deepens contentment.</p>
        </li>
        <li class="blog-list"><span class="semi-bold-blog-text">5. Be Kind to Yourself</span> 
            <p>Mindful living includes self-compassion. Notice your thoughts without judgment and allow yourself to rest when needed.</p>
        </li>
      </ol>

      <div class="blog-list">
        <span class="semi-bold-blog-text">Final Thought:</span>
        <p class="normal-blog-text">
          The art of mindful living is not about perfection but presence. It’s about finding beauty in the ordinary, calm in the chaos, and meaning in the everyday. By embracing mindfulness, we learn to live not just more peacefully, but more fully.
        </p>
      </div>
    `,
    readTime: "4 min read",
    divider: Line,
    icon: Read,
    category: "Lifestyle",
    popularity: 85,
  },
  {
    id: 3,
    slug: slugify("Building a Legacy of Impact"),
    image:
      "https://res.cloudinary.com/dklslzrkg/image/upload/v1758933100/blog3_xdjdpq.png",
    detailImage:
      "https://res.cloudinary.com/dklslzrkg/image/upload/v1758954764/detail3_ncd3bk.png",
    date: "Sept 23, 2025",
    isoDate: "2025-09-23",
    title: "Building a Legacy of Impact",
    description:
      "When people think of legacy, they often imagine wealth, property, or family name. But true legacy goes far beyond what you leave behind...",
    content: `
      <p>When people think of legacy, they often imagine wealth, property, or family name. But true legacy goes far beyond what you leave behind, it is about the lives you touch, the values you embody, and the difference you make in the world. A legacy of impact is not measured in material possessions but in influence, inspiration, and the ripple effects of your actions long after you are gone.</p>

      <div class="blog-list">
        <span class="semi-bold-blog-text">Redefining Legacy</span>
        <p class="normal-blog-text">
          Legacy is not about waiting until the end of life to be remembered; it is built every single day in the way you live, lead, and serve. Each decision, each interaction, and each opportunity to give becomes a building block. A legacy of impact is intentional, it’s not about what people will say about you, but how they will live differently because of you.
        </p>
      </div>
      <div class="blog-list">
        <span class="semi-bold-blog-text">Start with a Clear Vision</span>
        <p class="normal-blog-text">
          Impact doesn’t happen by accident. To build a meaningful legacy, you must first define what matters most to you. Ask yourself: What values do I want to pass on? What kind of change do I want to see in my family, community, or industry? This clarity acts as a compass, guiding your choices and priorities. Without a vision, legacy becomes accidental rather than purposeful.
        </p>
      </div>
      <div class="blog-list">
        <span class="semi-bold-blog-text">Lead by Example</span>
        <p class="normal-blog-text">
          People may forget your words, but they will not forget the way you lived. Integrity, humility, and consistency are cornerstones of an impactful legacy. Whether you are leading a team, raising a family, or serving in your community, others are watching—not just what you say, but how you act. By modelling the values you hope to pass on, you give others a living template to follow.
        </p>
      </div>
      <div class="blog-list">
        <span class="semi-bold-blog-text">Invest in People</span>
        <p class="normal-blog-text">
          At the heart of every lasting legacy is people. Wealth fades, buildings crumble, but the seeds you plant in others multiply across generations. Mentor someone. Encourage someone. Share your knowledge and open doors of opportunity for others. When you invest in people, your influence grows exponentially, far beyond what you could accomplish alone.
        </p>
      </div>
      <div class="blog-list">
        <span class="semi-bold-blog-text">Think Beyond Self</span>
        <p class="normal-blog-text">
          A legacy of impact is never self-centered. It looks outward and forward. It’s about building something that benefits others even when you’re no longer there. Whether through creating institutions, championing causes, or simply being present for those who need you, legacy asks you to see beyond your personal gain and focus on collective good.
        </p>
      </div>
      <div class="blog-list">
        <span class="semi-bold-blog-text">Live with Intentionality Today</span>
        <p class="normal-blog-text">
          The greatest mistake is believing legacy is something for later in life. In truth, you are building it right now. Every conversation, every choice, and every act of kindness or indifference contributes to the story you’re writing. The question is: Will the story inspire others, or will it fade into obscurity?
        </p>
      </div>
      <div class="blog-list">
        <span class="semi-bold-blog-text">Final Thought:</span>
        <p class="normal-blog-text">
          Building a legacy of impact is not about being famous—it’s about being faithful. It’s not about how long you lived, but how deeply you touched lives. It’s about creating ripples of change that extend beyond your reach, carrying forward your values, your vision, and your heart. Begin today. Lead with intention, love with purpose, and leave behind not just memories, but meaning.
        </p>
      </div>

    `,
    readTime: "6 min read",
    divider: Line,
    icon: Read,
    category: "Legacy",
    popularity: 200,
  },
];
