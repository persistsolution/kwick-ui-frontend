import ALLImages from "./ImageData";

export const Data = [
  ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
  ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
  ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
  ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
  ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"]
];

export const FixedHeaderData = [
  ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
  ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
  ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
  ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
  ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"],
  ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
  ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
  ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
  ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
  ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"],
  ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"]
];


export const TabuelaterData = [
  { id: 1, name: "Tiger Jackson", position: "System Designer", office: "Sed at", age: 41, salary: "$520,800" },
  { id: 2, name: "Vadett Summers", position: "UI Developer", office: "Japan", age: 28, salary: "$270,750" },
  { id: 3, name: "Lisbon Mox", position: "Junior Lecturer", office: "San Deigo", age: 45, salary: "$286,000" },
  { id: 4, name: "Medric Belly", position: "Javascript Developer", office: "Eden Gards", age: 25, salary: "$1,060" },
  { id: 5, name: "Ayri Satovu", position: "Senior Engineer", office: "Elitr stet", age: 25, salary: "$262,700" },
  { id: 6, name: "Billie William", position: "Software Engineer", office: "Paris", age: 52, salary: "$472,000" },
  { id: 7, name: "Merrod Sailor", position: "Sales Assosiative", office: "Sydney", age: 35, salary: "$237,500" },
  { id: 8, name: "Khona David", position: "DBMS Engineer", office: "France", age: 25, salary: "$427,900" },
  { id: 9, name: "Coolio Hornet", position: "Angular Developer", office: "Stet stet", age: 39, salary: "$205,500" },
  { id: 10, name: "Sonia Fraust", position: "Software Developer", office: "Magna lorem", age: 32, salary: "$303,600" },
  { id: 11, name: "Jennie Lora", position: "Bank Manager", office: "UK", age: 45, salary: "590,560" },
  { id: 12, name: "Flynn Hank", position: "Cloud Developer", office: "Mexico", age: 25, salary: "$442,000" },
  { id: 13, name: "Ricky Martin", position: "React Developer", office: "Sed sit", age: 48, salary: "$870,600" },
  { id: 14, name: "Halsey Kep", position: "Marketing Executive", office: "Takimata sit", age: 26, salary: "$513,500" },
  { id: 15, name: "Alaric Saltzman", position: "History Teacher", office: "Mystic Falls", age: 32, salary: "$385,750" },
  { id: 16, name: "Katherina Kat", position: "Event Planner", office: "Accusam est", age: 57, salary: "$98,500" },
  { id: 17, name: "Paulson Pal", position: "Data Analyst", office: "Manchester", age: 23, salary: "$325,000" },
  { id: 18, name: "Glory Sam", position: "System Administrator", office: "Sit Invidunt", age: 32, salary: "$337,500" },
  { id: 19, name: "Bradley Cooper", position: "Civil Engineer", office: "Aliquyam", age: 26, salary: "$332,000" },
  { id: 20, name: "Keera Dsoa", position: "Cloud Developer", office: "Sylvia", age: 53, salary: "$717,500" },
  { id: 21, name: "Alia Max", position: "Project Manager", office: "Old York", age: 26, salary: "$435,000" },
  { id: 22, name: "Yuri Gagarin", position: "Data Scientist", office: "Sun", age: 42, salary: "$989,900" },
  { id: 23, name: "cisaro Pals", position: "Sales Executive", office: "Kambodia", age: 25, salary: "$706,450" },
  { id: 24, name: "Amberson Pet", position: "Sales Manager", office: "Kidney", age: 25, salary: "$185,600" },
  { id: 25, name: "peter Parker", position: "Piolet", office: "Web Spal", age: 24, salary: "$900,000" },
];

export const TabuelaterColumns: any = [
  { title: "Name", field: "name", sorter: "string" },
  { title: "Position", field: "position", sorter: "string" },
  { title: "Office", field: "office", sorter: "string" },
  { title: "Age", field: "age", sorter: "number" },
  { title: "Salary", field: "salary", sorter: "string" },
];

export interface Userlisttype {
  id: number;
  preview: string,
  username: string,
  created: string,
  country: string,
  color: string,
  status: string,
  checked: boolean
}

export const UserlistData: Userlisttype[] = [
  {
    id: 1,
    preview: ALLImages('user16'),
    username: "Adam Cotter",
    created: "09 Dec 2017",
    country: "France",
    color: "success",
    status: 'Active',
    checked: true

  },
  {
    id: 2,
    preview: ALLImages('user15'),
    username: "Pauline Noble",
    created: "09 Dec 2017",
    country: "Brazil",
    color: "danger",
    status: 'Inactive',
    checked: false
  },
  {
    id: 3,
    preview: ALLImages('user4'),
    username: "Sherilyn Metzel",
    created: "27 Jan 2018",
    country: "USA",
    color: "warning",
    status: 'Pending',
    checked: false
  },
  {
    id: 4,
    preview: ALLImages('user3'),
    username: "Terrie Boaler",
    created: "20 Jan 2018",
    country: "Canada",
    color: "success",
    status: 'Active',
    checked: true

  },
  {
    id: 5,
    preview: ALLImages('user19'),
    username: "Rutter Pude",
    created: "13 Jan 2018",
    country: "Australia",
    color: "warning",
    status: 'Pending',
    checked: false
  },

  {
    id: 6,
    preview: ALLImages('user21'),
    username: "Clifford Benjamin",
    created: "25 Jan 2018",
    country: "China",
    color: "danger",
    status: 'Inactive',
    checked: false
  },
  {
    id: 7,
    preview: ALLImages('user12'),
    username: "Thedric Romans",
    created: "12 Jan 2018",
    country: "Russia",
    color: "success",
    status: 'Active',
    checked: false
  },
  {
    id: 8,
    preview: ALLImages('user15'),
    username: "Haily Carthew",
    created: "27 Jan 2018",
    country: "Thailand",
    color: "success",
    status: 'Active',
    checked: true
  },
  {
    id: 9,
    preview: ALLImages('user1'),
    username: "Dorothea Joicey",
    created: "12 Dec 2017",
    country: "Indonesia",
    color: "danger",
    status: 'Inactive',
    checked: false

  },
  {
    id: 10,
    preview: ALLImages('user12'),
    username: "Mikaela Pinel",
    created: "10 Dec 2017",
    country: "France",
    color: "warning",
    status: 'Pending',
    checked: false

  },
  {
    id: 11,
    preview: ALLImages('user15'),
    username: "Donnell Farries",
    created: "03 Dec 2017",
    country: "Poland",
    color: "success",
    status: 'Active',
    checked: false
  },
  {
    id: 12,
    preview: ALLImages('user4'),
    username: "Letizia Puncher",
    created: "09 Dec 2017",
    country: "Ukraine",
    color: "danger",
    status: 'Inactive',
    checked: true
  }
];

export interface Usergridtype {
  id: number;
  BGpreview1: string,
  userPreview2: string,
  username: string,
  designation: string,
  country: string,
  call: string,
  Post: string,
  follower: string,
  following: string
}
export const usergridData: Usergridtype[] = [
  {
    id: 1,
    BGpreview1: ALLImages('file4'),
    userPreview2: ALLImages('user2'),
    username: 'Adam Cotter',
    designation: 'Web Designer',
    country: 'France',
    call: '+1 1456789867',
    Post: '30k',
    follower: '7,345',
    following: '2,785'
  },
  {
    id: 2,
    BGpreview1: ALLImages('file5'),
    userPreview2: ALLImages('user3'),
    username: 'Adam Cotter',
    designation: 'Web Designer',
    country: 'United States',
    call: '+1 135792468',
    Post: '18k',
    follower: '6,452',
    following: '6,452'
  },
  {
    id: 3,
    BGpreview1: ALLImages('file6'),
    userPreview2: ALLImages('user4'),
    username: 'Terrie Boaler',
    designation: 'Web Designer',
    country: 'Canada',
    call: '+1 1567843567',
    Post: '25k',
    follower: '2,765',
    following: '4,876'
  },
  {
    id: 4,
    BGpreview1: ALLImages('file7'),
    userPreview2: ALLImages('user5'),
    username: 'Dorothea Joicey',
    designation: 'Web Designer',
    country: 'Indonesia',
    call: '+1 135792468',
    Post: '34k',
    follower: '1,789',
    following: '2,456'
  },
  {
    id: 5,
    BGpreview1: ALLImages('file8'),
    userPreview2: ALLImages('user6'),
    username: 'Donnell Farries',
    designation: 'Web Designer',
    country: 'Poland',
    call: '+1 1456789456',
    Post: '46k',
    follower: '2,567',
    following: '3,345'
  },
  {
    id: 6,
    BGpreview1: ALLImages('file9'),
    userPreview2: ALLImages('user7'),
    username: 'Letizia Puncher',
    designation: 'Web Designer',
    country: 'Ukraine',
    call: '+1 1456789867',
    Post: '24k',
    follower: '5,765',
    following: '7,345'
  },
  {
    id: 7,
    BGpreview1: ALLImages('file1'),
    userPreview2: ALLImages('user10'),
    username: 'Dennis Trexy',
    designation: 'Web Designer',
    country: 'California, USA',
    call: '+1 1456789867',
    Post: '16K',
    follower: '6,452',
    following: '6,452'
  },
  {
    id: 8,
    BGpreview1: ALLImages('file5'),
    userPreview2: ALLImages('user1'),
    username: 'Sherilyn Metzel',
    designation: 'Web Designer',
    country: 'Australia',
    call: '+1 1456789867',
    Post: '23k',
    follower: '4,765',
    following: '2,765'
  },
]

export interface userDatatype {
  UserlistData: Userlisttype[]
  usergridData: Usergridtype[]
}