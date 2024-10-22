import React from 'react';


const useTimeOutMessage = (message='', time=3) => {
    const [messageState, setMessageState] = React.useState(message);
    
    React.useEffect(() => {
        const timeout = setTimeout(() => {
        setMessageState('');
        }, time*1000);
    
        return () => clearTimeout(timeout);
    }, [message, time, messageState]);
    
    return { messageState, setMessageState };
    }

export default useTimeOutMessage;