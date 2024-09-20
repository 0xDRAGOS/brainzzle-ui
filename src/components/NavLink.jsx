import {Link} from "react-router-dom";

export default function NavLink({ active, children, className = '', ...props }) {
    return (
        <Link
            {...props}
            className={'inline-flex items-center px-4 pt-1 border-b-2 text-lg font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' + (active
                    ? 'text-gray-300 '
                    : 'border-transparent text-gray-300 hover:text-blue-700 rounded focus:text-blue-600 ') +
                className}
        >
            {children}
        </Link>
    )
}