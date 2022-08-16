import { useState } from 'react';

import styles from './Registration.module.css';

export const RegistrationComponent = () => {
  const [someValue, setSomeValue] = useState(42);

  setSomeValue(42);

  return (
    <div className={styles['container']}>
      <h1>Welcome to Registration!</h1>
      <p>
        Life, the universe, and everything {someValue}
      </p>
    </div>
  );
};

export default RegistrationComponent;
