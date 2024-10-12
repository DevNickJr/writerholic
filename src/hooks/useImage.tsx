import { useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import storage from '@/configs/firebase.config';
import { v4 as uuidv4 } from 'uuid';


const useImage = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState<number | null>(null)
    const [url, setUrl] = useState<string | null>(null)
    const uui = uuidv4()

    
    const uploadImage = (file: File) => {
        setError(null)
        setProgress(0)
        setLoading(true)

        const storageRef = ref(storage, `cindy/${uui}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress)
            console.log('Upload is ' + progress + '% done');
    
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
            }, 
            (error) => {
                setError(error?.message)
                setLoading(false)
                console.log("error", error)
            // Handle unsuccessful uploads
            }, 
            () => {
                setError(null)
                setProgress(100)
                setLoading(false)
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setUrl(downloadURL)
            });
            }
        );
    }

    
    return { url, uploadImage, error, progress, setError, loading, setUrl }
}

export default useImage