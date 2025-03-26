export interface Chat {
  id: number;
  name: string;
  role: string;
  time: string;
  isOnline?: boolean;
  avatar: string;
}

export const dummyChats: Chat[] = [
  {
    id: 1,
    name: "Kaiya George",
    role: "Project Manager",
    time: "15 mins",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Lindsey Curtis",
    role: "Designer",
    time: "30 mins",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Zain Geidt",
    role: "Content Writer",
    time: "45 mins",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Carla George",
    role: "Front-end Developer",
    time: "2 days",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Abram Schleifer",
    role: "Digital Marketer",
    time: "1 hour",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Lincoln Donin",
    role: "Project Manager",
    time: "3 days",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "An",
    role: "Tester",
    time: "5 days",
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?img=7",
  },

  {
    id: 9,
    name: "Thai",
    role: "Manager",
    time: "2 weeks",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 10,
    name: "New User",
    role: "UX Designer",
    time: "10 mins",
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?img=10",
  },
  {
    id: 11,
    name: "Another User",
    role: "Full Stack Developer",
    time: "20 mins",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 12,
    name: "Alice Johnson",
    role: "Data Analyst",
    time: "5 mins",
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 13,
    name: "Bob Smith",
    role: "Security Engineer",
    time: "1 day",
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 14,
    name: "Charlie Adams",
    role: "DevOps Engineer",
    time: "3 hours",
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 15,
    name: "Diana Lee",
    role: "Product Owner",
    time: "4 days",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 16,
    name: "Ethan Carter",
    role: "Software Architect",
    time: "30 mins",
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 17,
    name: "Fiona Maxwell",
    role: "Scrum Master",
    time: "2 weeks",
    avatar: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: 18,
    name: "George Benson",
    role: "HR Manager",
    time: "6 hours",
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: 19,
    name: "Hannah Evans",
    role: "QA Engineer",
    time: "1 week",
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?img=19",
  },
  {
    id: 20,
    name: "Isaac Newton",
    role: "AI Researcher",
    time: "3 days",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
];

export interface Message {
  id: number;
  sender: string;
  text?: string;
  time: string;
  type: "text" | "image";
  image?: string;
  isUser: boolean;
}

export const userMessages: Record<string, Message[]> = {
  "Lindsey Curtis": [
    {
      id: 1,
      sender: "Lindsey Curtis",
      text: "I want more detailed information.",
      time: "2 hours ago",
      type: "text",
      isUser: false,
    },
    {
      id: 3,
      sender: "Lindsey Curtis",
      text: "Please preview the image",
      time: "2 hours ago",
      type: "image",
      image: "https://react-demo.tailadmin.com/images/chat/chat.jpg",
      isUser: false,
    },
  ],
  You: [
    {
      id: 2,
      sender: "You",
      text: "They got there early, and got really good seats.",
      time: "2 hours ago",
      type: "text",
      isUser: true,
    },
    {
      id: 4,
      sender: "You",
      text: "They got there early, and got really good seats.",
      time: "2 hours ago",
      type: "text",
      isUser: true,
    },
  ],
  "Alice Johnson": [
    {
      id: 5,
      sender: "Alice Johnson",
      text: "Can you share the latest report?",
      time: "5 mins ago",
      type: "text",
      isUser: false,
    },
    {
      id: 6,
      sender: "You",
      text: "Sure, I’ll send it right away!",
      time: "Just now",
      type: "text",
      isUser: true,
    },
  ],
  "Charlie Adams": [
    {
      id: 7,
      sender: "Charlie Adams",
      text: "Here's the server architecture diagram.",
      time: "3 hours ago",
      type: "image",
      image: "https://react-demo.tailadmin.com/images/chat/server-diagram.jpg",
      isUser: false,
    },
  ],
  "Ethan Carter": [
    {
      id: 8,
      sender: "Ethan Carter",
      text: "We need to optimize the API response time.",
      time: "30 mins ago",
      type: "text",
      isUser: false,
    },
    {
      id: 9,
      sender: "You",
      text: "Got it, I'll check the database queries.",
      time: "Just now",
      type: "text",
      isUser: true,
    },
  ],
  "Diana Lee": [
    {
      id: 10,
      sender: "Diana Lee",
      text: "Can we schedule a meeting for tomorrow?",
      time: "1 day ago",
      type: "text",
      isUser: false,
    },
    {
      id: 11,
      sender: "You",
      text: "Yes, how about 10 AM?",
      time: "12 hours ago",
      type: "text",
      isUser: true,
    },
  ],
  "Fiona Maxwell": [
    {
      id: 12,
      sender: "Fiona Maxwell",
      text: "Here's the latest sprint report.",
      time: "2 days ago",
      type: "image",
      image: "https://react-demo.tailadmin.com/images/chat/sprint-report.jpg",
      isUser: false,
    },
  ],
  "George Benson": [
    {
      id: 13,
      sender: "George Benson",
      text: "We need to hire a new frontend developer.",
      time: "6 hours ago",
      type: "text",
      isUser: false,
    },
  ],
  "Hannah Evans": [
    {
      id: 14,
      sender: "Hannah Evans",
      text: "The last test case is failing. Can you check?",
      time: "10 mins ago",
      type: "text",
      isUser: false,
    },
    {
      id: 15,
      sender: "You",
      text: "Sure! I’ll debug it now.",
      time: "Just now",
      type: "text",
      isUser: true,
    },
  ],
  "Isaac Newton": [
    {
      id: 16,
      sender: "Isaac Newton",
      text: "I'm working on a new AI model, need your feedback.",
      time: "3 days ago",
      type: "text",
      isUser: false,
    },
  ],
  "Kaiya George": [],
  "Zain Geidt": [],
  "Carla George": [],
  "Abram Schleifer": [],
  "Lincoln Donin": [],
  An: [],
  Khanh: [],
  Thai: [],
  "New User": [],
  "Another User": [],
};
