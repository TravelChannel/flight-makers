import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const TimerModal = ({ isOpen, onRequestClose, onRefresh, onGoToHome }) => {
  const [timer, setTimer] = useState(30); // 30 seconds (1 minute)
  const navigate = useNavigate();
  Modal.setAppElement('#root');
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      navigate('/');
    }

    return () => clearInterval(interval);
  }, [timer,navigate]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div>
        <h5>Your session will expire soon. What would you like to do?</h5>
        <p className='timer_pragraph'>Time remaining: <span className={timer <= 10 ? 'red-timer' : 'normal-timer'}>{timer} s</span></p>
        <div className='d-flex justify-content-end mt-3'>
          <button className='btn btn-outline-primary mr-2' onClick={onRefresh}>Refresh</button>
          <button className='btn btn-primary' onClick={onGoToHome}>Go to Homepage</button>
        </div>
      </div>
    </Modal>
  );
};

export default TimerModal;
