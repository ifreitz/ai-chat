import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <a href="https://github.com/ifreitz" target="_blank" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                <span className="text-sm font-medium">Check my github</span> 
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
            </a>
            
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Ian Freitz <span class="text-blue-600 dark:text-blue-500">de la Cerna</span></h1>
            <p className="text-lg mb-4 font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              This is just my personal project
            </p>

            <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                <span className="font-semibold text-gray-400 uppercase">Projects</span>
                <div className="flex flex-wrap justify-center items-center mt-8 text-white sm:justify-between">
                    <a href="/chat" className="bg-blue-500 mr-5 mb-5 lg:mb-0 p-2 rounded">
                        AI Chat                      
                    </a>       
                </div>
            </div> 
        </div>
    </section>
  );
}
