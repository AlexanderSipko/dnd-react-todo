// import "@blocknote/core/fonts/inter.css";
// import {
//   DragHandleButton,
//   SideMenu,
//   SideMenuController,
// } from "@blocknote/react";
// import {
//     useBlockNoteEditor,
//     useComponentsContext,
//   } from "@blocknote/react";
//   import { MdDelete } from "react-icons/md";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
 
// import { useEffect, useMemo, useState } from "react";
 
// async function saveToStorage(jsonBlocks) {
//   // Save contents to local storage. You might want to debounce this or replace
//   // with a call to your API / database.
//   localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
// }
 
// async function loadFromStorage() {
//   // Gets the previously stored editor contents.
//   const storageString = localStorage.getItem("editorContent");
//   return storageString
//     ? (JSON.parse(storageString))
//     : undefined;
// }
 
// export default function BlockNote() {
//   const [initialContent, setInitialContent] = useState("loading");
 
//   // Loads the previously stored editor contents.
//   useEffect(() => {
//     loadFromStorage().then((content) => {
//       setInitialContent(content);
//     });
//   }, []);
 
//   // Creates a new editor instance.
//   // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
//   // can delay the creation of the editor until the initial content is loaded.
//   const editor = useMemo(() => {
//     if (initialContent === "loading") {
//       return undefined;
//     }
//     return BlockNoteEditor.create({ initialContent });
//   }, [initialContent]);
 
//   if (editor === undefined) {
//     return "Loading content...";
//   }
 
//   // Renders the editor instance.
//   return (
   
//     <BlockNoteView
//         editor={editor}
//         sideMenu={false}
//         onChange={() => {
//             saveToStorage(editor.document);
//           }}
//         >
//       <SideMenuController
//         sideMenu={(props) => (
//           <SideMenu {...props}>
//             {/* Button which removes the hovered block. */}
//             <RemoveBlockButton {...props} />
//             <DragHandleButton {...props} />
//           </SideMenu>
//         )}
//       />
//     </BlockNoteView>
    
//   );
// }
 

// // Custom Side Menu button to remove the hovered block.
// export function RemoveBlockButton(props) {
//     const editor = useBlockNoteEditor();
   
//     const Components = useComponentsContext();
   
//     return (
//       <Components.SideMenu.Button
//         label="Remove block"
//         icon={
//           <MdDelete
//             size={24}
//             onClick={() => {
//               editor.removeBlocks([props.block]);
//             }}
//           />
//         }
//       />
//     );
//   }