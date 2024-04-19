import react from 'react'
import { Link } from 'react-router-dom'

import PageNotFoundImg from '../assets/images/page-not-found.svg'

const PageNotFound = () => {
    return (
        <div>
            <section className="page__not__found">
                <img src={PageNotFoundImg} alt="" />
                <p>We can't seem to find a page you're looking for</p>
                <Link to='/' className='page__not__found__btn'>
                    <i class='bx bx-arrow-back'></i>
                    <div>Back to homepage</div>
                </Link>
            </section>
        </div>
    )
}

export default PageNotFound;