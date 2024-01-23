const useCopy = () => {
  const copy = async text => {
    const fallbackCopyTextToClipboard = text => {
      let textArea = document.createElement("textarea");
      textArea.value = text;
      // Avoid scrolling to bottom
      textArea.style.top = "-200";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      let msg;
      try {
        let successful = document.execCommand("copy");
        msg = successful ? "复制成功" : "复制失败";
      } catch (err) {
        msg = "复制失败";
      }
      alert(msg);
      document.body.removeChild(textArea);
    };

    const copyTextToClipboard = text => {
      if (!navigator.clipboard || !window.isSecureContext) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("复制成功");
        })
        .catch(() => {
          fallbackCopyTextToClipboard(text);
        });
    };
    copyTextToClipboard(text);
  };

  return copy;
};
export default useCopy;
