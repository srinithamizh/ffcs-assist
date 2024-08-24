export const getRandomInteger = (
  digits: number,
  min: number = Math.pow(10, digits - 1),
  max: number = Math.pow(10, digits) - 1
): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export interface ICourse {
  id: number;
  code: string;
  name: string;
  category: string;
  slot: string;
  faculty: string;
  venue: string;
  credit: string;
}

export const storageDataIntoLocalStorage = (courseData: ICourse[]) => {
  const storedCourses = localStorage.getItem('courseList');
  let courseList: ICourse[] = storedCourses ? JSON.parse(storedCourses) : [];

  courseData.forEach((course) => {
    const isDuplicate = courseList.some(
      (item) =>
        item.code === course.code &&
        item.slot === course.slot &&
        item.venue === course.venue
    );

    if (!isDuplicate) {
      course.id = getRandomInteger(5, 10000, 99999);
      courseList.push(course);
      localStorage.setItem('courseList', JSON.stringify(courseList));
    } else {
      console.log('Duplicate found, course not added.');
    }
  });
};
