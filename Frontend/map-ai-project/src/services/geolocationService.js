export const getUserGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (err) => {
          reject(new Error(`Geolocation error: ${err.message}`));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    }
  });
};
