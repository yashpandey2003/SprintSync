import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import { Button } from '@/components/ui/button';
import styles from './Auth.module.css';
import { CheckCircledIcon } from '@radix-ui/react-icons';

const Auth = () => {
    const [active, setActive] = useState(true);
    
    const features = [
        "Kanban-style task management",
        "Real-time team collaboration",
        "Built-in project chat",
        "Smart issue tracking & assignment"
    ];

    return (
        <div className={styles.loginContainer}>
            {/* Left Branding Panel */}
            <div className={styles.brandingPanel}>
                <div className={styles.brandingContent}>
                    <h1 className={styles.brandingTitle}>
                        Manage Projects<br />with SprintSync
                    </h1>
                    <p className={styles.brandingSubtitle}>
                        Streamline your workflow, collaborate with your team, 
                        and deliver projects on time.
                    </p>
                    <div className={styles.featureList}>
                        {features.map((feature, i) => (
                            <div key={i} className={styles.featureItem}>
                                <div className={styles.featureIcon}>
                                    <CheckCircledIcon />
                                </div>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className={styles.formPanel}>
                <div className={`${styles.box} h-[30rem] w-[25rem]`}>
                    <div className={`${styles.minContainer} ${styles.login}`}>
                        <div className={`${styles.loginBox} w-full px-10 space-y-5`}>
                            {active ? <Signup /> : <Login />}
                            <div className='text-center'>
                                <span className='text-sm text-muted-foreground'>
                                    {active ? "Already have an account?" : "Don't have an account?"}
                                </span>
                                <Button variant="ghost" onClick={() => setActive(!active)} className='text-primary hover:text-primary/80'>
                                    {active ? "Sign In" : "Sign Up"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
