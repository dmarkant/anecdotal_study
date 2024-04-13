const pages = [
  "consent",
  //"pre",
  "instructions1",
  "instructions2",
  "instructions3",
  //"quiz",
  "task1",
  //"cogref",
  "task2",
  //"instructions4",
  //"task3",
  //"post",
  "debrief",
];

// gets next page path
const pageHandler = (donePage) => {
  let pageIndex = pages.indexOf(donePage.replace("/", ""));
  if (pageIndex !== -1) {
    return `/${pages[pageIndex + 1]}`;
  }
};

export default pageHandler;
