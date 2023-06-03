export const onAddCircle = (editor) => {
  editor?.addCircle();
};
export const onAddRectangle = (editor) => {
  editor?.addRectangle();
};
export const onAddText = (editor, text, setText, setShowTextField) => {
  editor?.addText(text);
  setText("");
  setShowTextField((current) => !current);
};
export const onDeleteAll = (editor, setText) => {
  editor?.deleteAll();
  setText("");
};
export const onDeleteSelected = (editor) => {
  editor?.deleteSelected();
};

export const addImage = (fabric, editor, imageURL, setShowUploadField) => {
  console.log("adding image");
  if (imageURL) {
    const getImageURL = URL.createObjectURL(imageURL);
    fabric.Image.fromURL(getImageURL, function (oImg) {
      editor?.canvas.add(oImg);
    });
  }
  setShowUploadField((prev) => !prev);
};
