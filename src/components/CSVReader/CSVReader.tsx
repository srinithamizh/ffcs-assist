import React, { useEffect, useRef, useState } from 'react';
import { generateUUID, ICourse } from '../../utils';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../slice/CourseListSlice';

interface CourseData {
  category: string;
  code: string;
  name: string;
  slot: string;
  faculty: string;
  credit: string;
  venue: string;
}

const CSVReader: React.FC = () => {
  const [csvFile, setCSVFile] = useState<File | null>(null);
  const [csvArray, setCSVArray] = useState<ICourse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (csvArray.length > 0) {
      csvArray.forEach((course) => {
        course.id = generateUUID();
        dispatch(addCourse(course));
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setCSVFile(null);
    }
  }, [csvArray]);

  const processCSV = (str: string, delim: string = ',') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim);
    const mandatoryFields = ['code', 'slot', 'venue'];
    const isCSVContainsMandtoryFields = headers.filter((header) =>
      mandatoryFields.includes(header.toLowerCase())
    );
    if (isCSVContainsMandtoryFields.length === 3) {
      const rows = str.slice(str.indexOf('\n') + 1).split('\n');

      const newArray: ICourse[] = rows
        .filter((row) => row.length > 0)
        .map((row) => {
          const values = row.split(delim);
          const eachObject = headers.reduce((obj, header, i) => {
            obj[header.trim() as keyof CourseData] =
              values[i].replace('\r', '').toUpperCase() || '';
            return obj;
          }, {} as ICourse);
          return eachObject;
        });

      setCSVArray(newArray);
    } else {
      setError('Mandatory fields are missing!');
    }
  };

  const submit = () => {
    if (csvFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const text = event.target?.result as string;
        processCSV(text);
      };

      reader.readAsText(csvFile);
    }
  };

  const handleCSVFile = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setCSVFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (csvFile) {
      submit();
    }
  };

  const handleReUpload = () => {
    setError(null);
  };

  return (
    <>
      {error ? (
        <div>
          <h3>{error}</h3>
          <button
            className="btn btn-primary-custom align-right"
            onClick={handleReUpload}
          >
            Re-Upload
          </button>
        </div>
      ) : (
        <form id="csv-form">
          <label htmlFor="inputCourseCategory" className="form-label">
            Upload File (.csv)
          </label>
          <input
            type="file"
            className="form-control"
            accept=".csv"
            id="csvFile"
            onChange={handleCSVFile}
            ref={fileInputRef}
          />
          <br />
          <button
            className="btn btn-primary-custom align-right"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </form>
      )}
    </>
  );
};

export default CSVReader;
