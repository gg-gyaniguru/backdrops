import {useEffect, useState} from "react";
import {toast} from "sonner";
import axios from '../utils/axios.ts';
import {getKey} from "../utils/local.ts";
import {useNavigate} from "react-router-dom";

interface CreateDrop {
    p?:boolean
}

const CreateDrop = ({p=true}:CreateDrop) => {

    const [isFetching, setIsFetching] = useState(false);
    const [image, setImage] = useState<any>('');
    const [preview, setPreview] = useState<any>('');
    const [input, setInput] = useState('');


    const _id = getKey('_id');

    const navigate = useNavigate();

    const upload = (e: any) => {
        Object.keys(e.target.files).forEach(file => {
            setImage(e.target.files[file])
        })
    }

    const createPost = async () => {
        try {
            const file = new FormData()
            file.append('_id', _id);
            file.append('description', input);
            // image?.forEach((src: any) => {
            file.append('image', image);
            // });
            setIsFetching(true);
            const response = await axios.post(`/drop/create`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsFetching(false);
            toast.success(response.data.message);
            setImage([]);
            setPreview([]);
            setInput('');
            navigate('/');
        } catch (error: any) {
            setIsFetching(false);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        setPreview([])
        const reader = new FileReader();
        if (image) {
            reader.readAsDataURL(image);
        }
        reader.onload = (e: any) => {
            setPreview(e.target.result)
        }
    }, [image]);

    return (
        <>
            <div className={`w-full ${p && 'p-5'} flex flex-col gap-3 bg-gray-900 rounded-3xl`}>
                <span className={'px-3 text-start'}>What's on your mind ?</span>
                <input
                    className={'file:mr-3 file:px-3 text-sm file:text-base file:py-1.5 file:text-white  file:rounded-full file:bg-indigo-600 file:border-0 cursor-pointer'}
                    type={'file'} accept={'image/png, image/jpeg'} onChange={upload}/>
                <div className={'p-3 flex flex-col gap-3 bg-gray-800 rounded-xl'}>
                    {
                        preview.length > 0 &&
                        <div className={'w-full rounded-md'}>
                            <img className={'w-full rounded-md'} src={preview} alt={''}/>
                        </div>
                    }
                    <textarea
                        className={'w-full outline-0 resize-none bg-transparent'}
                        placeholder={'Say something...!'}
                        value={input} onChange={(e) => setInput(e.target.value)}/>
                </div>
                <button className={'w-full px-3 py-1.5 bg-blue-600 rounded-xl'} onClick={createPost}
                        disabled={isFetching}>
                    {isFetching ?
                        <div className={'m-auto dots-3'}></div> : 'Create Drops'}
                </button>
            </div>
        </>
    );
};

export default CreateDrop;