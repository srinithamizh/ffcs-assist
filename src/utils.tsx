export interface ICourse {
  id: string;
  code: string;
  name: string;
  category: string;
  slot: string;
  faculty: string;
  venue: string;
  credit: string;
}

export const getDataFromLocalStorage = () => {
  const storedCourses = localStorage.getItem('courseList');
  let courseList: ICourse[] = storedCourses ? JSON.parse(storedCourses) : [];
  return courseList;
};

export const storageDataIntoLocalStorage = (
  courseData: ICourse[],
  course: ICourse
): boolean => {
  const isDuplicate = courseData.some(
    (item) =>
      item.code === course.code &&
      item.slot === course.slot &&
      item.venue === course.venue
  );
  if (!isDuplicate) {
    localStorage.setItem('courseList', JSON.stringify(courseData));
    return true;
  }
  return false;
};

export const generateUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};
