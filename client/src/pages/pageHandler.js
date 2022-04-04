const pages = [
  "consent",
  "pre",
  "instructions1",
  "instructions2",
  "task1",
  "cogref",
  "task2",
  "task3",
  "post",
  "debrief",
];

const pageHandler = (donePage) => {
  console.log(donePage);
  let pageIndex = pages.indexOf(donePage.replace("/", ""));
  console.log(pageIndex);
  if (pageIndex !== -1) {
    return `/${pages[pageIndex + 1]}`;
  }
};

export default pageHandler;
