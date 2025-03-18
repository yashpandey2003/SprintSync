import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import { Button } from '@/components/ui/button';
import styles from './Auth.module.css';

const Auth = () => {
    const [active, setActive] = useState(true);
    return (
        <div className={styles.loginContainer}>
            <div className={`${styles.box} h-[30rem] w-[25rem]`}>
                <div className={`${styles.minContainer} ${styles.login}`}>
                    <div className={`${styles.loginBox} w-full px-10 space-y-5`}>
                        {active ? <Signup /> : <Login />}
                        <div>
                            <span>{active ? "Already have an account?" : "Don't have an account?"}</span>
                            <Button variant="ghost" onClick={() => setActive(!active)}>
                                {active ? "Signin" : "Signup"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
