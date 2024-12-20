import type {drop} from "../types/drop.ts";
import UserProfile from "./UserProfile.tsx";
import {post, remove} from "../utils/fetch.ts";
import {getKey} from "../utils/local.ts";
import likeIcon from '../assets/like.png';
import likedIcon from '../assets/liked.png';
import shareIcon from '../assets/share.png';
import downloadIcon from '../assets/download.png';
import removeIcon from '../assets/remove.png';
import {toast} from "sonner";
import {useMemo, useState} from "react";
import Likes from "./Likes.tsx";
import Comments from "./Comments.tsx";
import {shortener} from "../utils/logic.ts";
import Share from "./Share.tsx";

type Drop = {
    drop: drop,
    action: any
}

const Drop = ({drop, action}: Drop) => {

    const [isFetching, setIsFetching] = useState(false);

    const _id = getKey('_id');

    const user = useMemo(() => drop.user._id === _id, [drop]);

    const like = async () => {
        try {
            setIsFetching(true);
            const response = await post('/drop/like', {
                drop_id: drop._id
            })
            setIsFetching(false);
            action()
            toast.success(response.message);
        } catch (error: any) {
            setIsFetching(false);
            toast.error(error.message);
        }
    }

    const unlike = async () => {
        try {
            setIsFetching(true);
            const response = await post('/drop/unlike', {
                drop_id: drop._id
            })
            setIsFetching(false);
            action()
            toast.success(response.message);
        } catch (error) {
            setIsFetching(false);
        }
    }

    const copyToClipboard = (_id:string) => {
        navigator.clipboard.writeText(`http://localhost:6090/drop/${_id}`);
    }

    const downloadDrop = async () => {
        try {
            const response = await fetch(drop.src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${drop._id}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error('downloadIcon fail');
        }
    }

    const removeDrop = async (_id: string) => {
        try {
            setIsFetching(true);
            const response = await remove(`/drop/remove/${drop._id}`);
            setIsFetching(false);
            action()
            toast.success(response.message);
        } catch (error: any) {
            setIsFetching(false);
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className={'h-full p-3 flex flex-col gap-3 rounded-xl'}>
                <div className={'w-fit px-3'}>
                    <UserProfile src={drop.user.src} username={drop.user.username} verified={drop.user.verified}/>
                </div>
                <div className={'h-full p-3 flex flex-col gap-3 rounded-xl bg-gray-800'}>
                    <div className={'w-full rounded-md'}>
                        <img className={'w-full rounded-md'} src={drop.src} alt={''}/>
                    </div>
                    <div className={''}>
                        {drop.description}
                    </div>
                </div>
                <div className={'px-3 flex items-center justify-between'}>
                    <div className={'flex items-center gap-6'}>
                        <div className={'flex items-center gap-3'}>
                            <button disabled={isFetching} onClick={() => drop.isLike ? unlike() : like()}>
                                <img className={'w-5 h-5'} src={drop.isLike ? likedIcon : likeIcon} alt={''}/>
                            </button>
                            <Likes _id={drop._id} likes={drop.likes}/>
                        </div>
                        <div className={'flex items-center gap-3'}>
                            <Comments drop_id={drop._id}/>
                            <button>{shortener(drop.comments)}</button>
                        </div>
                        <div className={'flex items-center gap-3'}>
                            <Share _id={drop._id}/>
                        </div>
                    </div>
                    <div className={'flex items-center gap-3'}>
                        <button className={'h-fit'} onClick={() => user ? removeDrop(drop._id) : downloadDrop()}
                                disabled={isFetching}>
                            <img
                                className={'w-5 h-5'}
                                src={user ? removeIcon : downloadIcon}
                                alt={''}/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export type {Drop};
export default Drop;