export default function NavbarComponent() {
  return (
    <header className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-mono text-gray-900 sm:text-3xl">
              Notes App
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              AWS Amplify powered full-stack application
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:ring-3 focus:outline-hidden"
              type="button"
            >
              <span className="text-sm font-medium"> View Notes </span>
            </a>

            <a
              className="inline-block rounded-sm bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:ring-3 focus:outline-hidden"
              type="button"
              href="/form/new"
            >
              Create Notes
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
