import Head from 'next/head'
import Link from 'next/link'

function BackgroundVideo({ video }: { video: string }) {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="hidden md:block absolute z-[-1] w-auto min-w-full min-h-full bottom-0 max-w-full  overflow-hidden"
      >
        <source
          src={video}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="hidden bg-orange-700 opacity-50 md:block absolute z-[-1] w-auto min-w-full min-h-full bottom-0 max-w-full  overflow-hidden"></div>
    </>
  )
}

function Home() {
  return (
    <>
      <Head>
        <title>Smart Cart</title>
        <meta name="description" content="Smart Cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className="pt-[70px]">
          <BackgroundVideo video="/background-video.mp4" />
          <main className="px-4 md:px-4 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[calc(100vh-111px)]">
            <div className="md:text-left  flex justify-center flex-row">
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline text-gray-200">Welcome to</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 pb-4">
                    Smart Cart
                  </span>
                  <span className="block text-orange-300 font-medium text-2xl">
                    Customer assistance
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Save money and make healthier food choices while shopping.
                </p>
              </div>
              <div className="md:flex hidden my-auto w-[30%] md:w-[50%] items-end ml-2">
              </div>
            </div>
          </main>
        </div>
      </>
    </>
  )
}

export default Home