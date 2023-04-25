import Image from'next/image'
import Head from 'next/head'

import lots from '../styles/lots.module.css'
import Sidebar from './sidebar';

import { useEffect, useState } from 'react';
import Axios from 'axios';

function Details() {
    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        Axios.get('http://143.198.181.11:3001/current').then((response) =>{
        console.log(response)
        setBackendData(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const currentFacultyNum = backendData[0].CurrentSpacesFaculty + "/ 20"
    const currentStudentNum = backendData[0].CurrentSpacesStudent + "/ 30"
    const currentHandicappedNum = backendData[0].CurrentSpacesHandicapped + "/ 2"
    const currentVisitorNum = backendData[0].CurrentSpacesVisitor + "/ 0"


    return (
        <>
			{/* browser tab title and icon */}
            <Head>
                <link rel="icon" href="/latech.ico"/>
                <title>Nethken Parking</title>
            </Head>


            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
        

            {/* navbar title */}
            <div className={lots.navbar}>
                <h2>Nethken Lot</h2>
            </div>


            {/* page content */}
            <div className={lots.content}>
                {/* parking lot address */}
                <p>501 Dan Reneau Drive | Ruston, LA 71270</p>
                
                {/* parking lot image/map */}
                <Image
                    src="/parking-lot.jpg"
                    height={250}
                    width={250}
                    alt="Nethken Parking Lot Map"
                />


                {/* available parking & time update */}
                <h2>Available Parking</h2>
                <form>
                    <label className={lots.timeLabel}>
                        Last updated at
                    </label>
                    <input type="text"
                           value="8:30 AM"
                           className={lots.timeBox}
                           readOnly 
                    />
                </form>
                <br/>

                {/* available parking spaces & categories */}
                <div className={lots.readonly}>
                    {/* available student spaces */}
                    <form>
                        <input type="text"
                            value={currentStudentNum}
                            className={lots.spaceBox}
                            readOnly/>
                        <label className={lots.spaceLabel}>
                            Student
                        </label>
                    </form>

                    {/* available faculty spaces */}
                    <form>
                        <input type="text"
                            value={currentFacultyNum}
                            className={lots.spaceBox}
                            readOnly/>
                        <label className={lots.spaceLabel}>
                            Faculty
                        </label>
                    </form>

                    {/* available handicapped spaces */}
                    <form>
                        <input type="text"
                            value={currentHandicappedNum}
                            className={lots.spaceBox}
                            readOnly/>
                        <label className={lots.spaceLabel}>
                            Handicapped
                        </label>
                    </form>

                    {/* available students spaces */}
                    <form>
                        <input type="text"
                                value={currentVisitorNum}
                                className={lots.spaceBox}
                                readOnly/>
                        <label className={lots.spaceLabel}>
                            Visitor
                        </label>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Details;