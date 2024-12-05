import shareIcon from '../assets/share.png';
import Modal from "./Modal.tsx";

interface Share {
    _id: string
}

const Share = ({_id}:Share) => {



    return (
        <>
            <Modal className={'w-5 h-5 invert'} modalTitle={'share'} icon={shareIcon} effect={'bottom'} large={'w-5 h-5'}>
                <div className={''}>

                </div>
            </Modal>
        </>
    );
};

export default Share;