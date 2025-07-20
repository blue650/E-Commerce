document.querySelector('#app').innerHTML = `
  <div style="background-color: black; color: white; min-height: 100vh; padding: 20px;">
    <h1 style="text-align: center;">Welcome to Blue Collar Biz Guide</h1>

    <section style="margin-top: 40px;">
      <h2>Intro Video</h2>
      <video controls autoplay muted loop style="width: 100%; max-width: 800px;">
        <source src="/intro.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>

    <section style="margin-top: 40px;">
      <h2>Second Video</h2>
      <video controls autoplay muted loop style="width: 100%; max-width: 800px;">
        <source src="/Introvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  </div>
`;
