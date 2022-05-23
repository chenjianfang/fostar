function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onerror = (err) => {
      reject(err);
    };
    script.onload = () => {
      resolve();
    };
    document.body.appendChild(script);
  });
}

export default loadScript;
