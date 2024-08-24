import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import './Disclaimer.css';

const Disclaimer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [disclaimerShown, setDisclaimerShown] = useLocalStorage(
    'disclaimerShown',
    false
  );

  const disclaimerContent = {
    heading: 'I would like to bring your attention to the following statement:',
    body: '"FFCS Assist is an independent entity and is not associated with VIT University."',
    sub_body: `The purpose of creating this website is to aid students in creating their timetables in advance of course registration to prevent scheduling conflicts and confusion. 
    It is important to note that this website is not the source for updates regarding the course registration process.`,
  };

  useEffect(() => {
    if (!disclaimerShown) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setDisclaimerShown(true);
  };
  return (
    <>
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Disclaimer</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body text-aligned-justify">
                <p>{disclaimerContent.heading}</p>
                <p style={{ fontWeight: 'bold' }}>{disclaimerContent.body}</p>
                <p>{disclaimerContent.sub_body}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary-custom"
                  onClick={handleClose}
                >
                  I Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Disclaimer;
