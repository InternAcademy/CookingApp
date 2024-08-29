import { uiActions } from "@/store/uiSlice";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import CancellationModal from "./CancellationModal";
import RecipeRemovalModal from "./RecipeRemovalModal";
import ChatDeletionModal from "./ChatDeletionModal";
export default function Modal() {
  const { isOpen, cancelSub, removeRecipe, removeChat } = useSelector(
    (state) => state.ui.modal
  );
  const dialog = useRef(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen]);
  function handleClosing() {
    dispatch(uiActions.closeModal());
  }
  console.log({ isOpen, cancelSub, removeRecipe });
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={handleClosing}>
      {cancelSub && <CancellationModal subId={cancelSub} />}
      {removeRecipe && <RecipeRemovalModal recipeId={removeRecipe} />}
      {removeChat && <ChatDeletionModal chatId={removeChat} />}
    </dialog>,
    document.getElementById("modal")
  );
}
