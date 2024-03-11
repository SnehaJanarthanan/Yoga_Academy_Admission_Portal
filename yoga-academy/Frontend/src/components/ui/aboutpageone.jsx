const AboutPage1 = () => {
  return (
    <section className="bg-white dark:white">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h1 className="mb-4 text-6xl tracking-tight font-extrabold text-gray-900 dark:grey - 900">
            About Us
          </h1>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:grey - 900">
            Find Harmony in Every Breath
          </h2>
          <p className="mb-4">
            We are dedicated yoga practitioners and instructors, committed to
            guiding you on your journey towards physical, mental, and spiritual
            well-being. Our classes cater to practitioners of all levels, from
            beginners to advanced yogis, offering a diverse range of styles
            including Hatha, Vinyasa, Yin, and more.
          </p>
          <p>
            At our studio, you'll find a supportive community where you can
            explore the transformative power of yoga, cultivate mindfulness, and
            enhance your overall health and vitality. Join us on the mat and
            discover the profound benefits of this ancient practice.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="https://images.unsplash.com/photo-1593164842249-d74fc06dae05?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Yoga class"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="https://images.unsplash.com/photo-1616940916839-bfd5f9adde5a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Yoga studio interior"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPage1;
