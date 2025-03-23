import { useState, useEffect } from "react"
import axios from 'axios'
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from 'react-icons/io'
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb'
import { ImSpinner8 } from 'react-icons/im'

// api key

const APIkey = 'cca613aa879e2e36f93439d4a92724cf';


function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Madrid, Spain');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value)
  };
  const handleSubmit = (e) => {

    //if input value is not empty
    if (inputValue !== '') {
      //set location
      setLocation(inputValue);
    }

    //select  input

    const input = document.querySelector('input');

    //if input value is empty
    if (input.value === '') {
      // set animate to true
      setAnimate(true);
      //after 500 ms set animate to false
      setTimeout(() => {
        setAnimate(false);
      }
        , 500);
    }

    //clear input
    input.value = '';


    //prevent default
    e.preventDefault();
  };
  // fetch the data 
  useEffect(() => {

    //set loading to true
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`

    axios.get(url).then(res => {
      //set the data after 1500 ms

      setTimeout(() => {
        setData(res.data);
        //set loading to false

        setLoading(false);
      }, 1500)
    }).catch(err => {
      setLoading(false);
      setErrorMsg(err);
    })




  }, [location]);

  //error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 2000)
    //clear timer
    return () => clearTimeout(timer);

  }, [errorMsg])

  // if data is false show the loader
  if (!data) {
    return (
      <div className="w-full h-screen bg-gradient-to-r from-purple-700 to-blue-300 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <div>
          <ImSpinner8 className=" text-8xl animate-spin text-white " />
        </div>
      </div>
    );
  }

  // set the icon accorading to the weather

  let icon;


  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy className="text-[#C7C6C4]" />
      break;

    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break;
    case 'Rain':
      icon = <IoMdRainy className="text-[#31cafb]"/>
      break;
    case 'Clear':
      icon = <IoMdSunny className="text-[#ffde33]" />
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />
      break;
    case 'Snow':
      icon = <IoMdSnow className="text-[#31cafb]"/>
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />
      break;
  }
  //data object
  const date = new Date();



  return (
    <div className=" w-full h-screen bg-gradient-to-r from-purple-700 to-blue-300 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {errorMsg && <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#f10000] text-white absolute top-1  capitalize rounded-md">{errorMsg.response.data.message}</div>}
      { /*from */}

      <form className={`${animate ? 'animate-shake' : 'animate-none'}h-14 bg-black/30 w-full max-w-[450px]  rounded-full backdrop-blur-[32px] mb-6`}>
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder="Search by city or country" />
          <button onClick=
            {(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition">
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/*Card */}
      <div className="w-full max-w-[450px] bg-black/20 min-h-[564px] text-white backdrop-blur-[32p] rounded-[32px] py-12 px-6" >

        <div>
          {/*card top */}
          <div className=" flex items-center gap-x-5">
            {/*icon */}
            <div className="text-[87px]">{icon}</div>
            <div>
              {/*country name*/}
              <div className="text-[25px] font-semibold ">
                {data.name}, {data.sys.country}

              </div>
              {/*date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>

            </div>
          </div>

          {/*card body */}
          <div className="my-20">
            <div className="flex justify-center items-center">
              {/*temp */}
              <div className="text-[144px] leading-none font-light">
                {parseInt(data.main.temp)}

              </div>
              {/*celsius icon */}
              <div className="text-[30px] ">
                <TbTemperatureCelsius />
              </div>
            </div>
            {/*weather */}
            <div className="capitalize text-center">{data.weather[0].description}</div>
          </div>
          { /*card bottom */}
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">

              <div className="flex items-center  gap-x-2">
                {/*icons */}
                <div className="text-[20px] ">
                  <BsEye />
                </div>
                <div>
                  Visibility{' '}
                  <span className="ml-2">{data.visibility / 1000}km</span>
                </div>
              </div>
              <div className="flex items-center  gap-x-2">
                {/*icons */}
                <div className="text-[20px] ">
                  <BsThermometer />
                </div>
                <div className="flex">
                  Feels like
                  <div className="flex ml-2">{parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">

              <div className="flex items-center  gap-x-2">
                {/*icons */}
                <div className="text-[20px] ">
                  <BsWater />
                </div>
                <div>
                  Humidity
                  <span className="ml-2">{data.main.humidity} %</span>
                </div>
              </div>
              <div className="flex items-center  gap-x-2">
                {/*icons */}
                <div className="text-[20px] ">
                  <BsWind />
                </div>
                <div>
                  Wind
                  <span className="ml-2">{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>



          </div>

        </div>





      </div>

    </div >
  )


};

export default App
