import toast from 'react-hot-toast';

export default function Notify(){ 
    toast((t) => (
      <span>
        Custom and <b>bold</b>
        <button onClick={() => toast.dismiss(t.id)}>
          Dismiss
        </button>
      </span>
    ));
}