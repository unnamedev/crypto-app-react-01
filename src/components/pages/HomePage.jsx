import {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {LineWobble} from '@uiball/loaders'
import {toast} from 'react-hot-toast'

/**
 * @description HomePage
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = () => {
    // 🍀 HOOKS & VARIABLES:
    const {crypto, cryptoLoading, cryptoError} = useSelector(({crypto}) => crypto)
    const [sortKey, setSortKey] = useState('price_change_percentage_24h')
    const [sortOrder, setSortOrder] = useState('DESC')

    // 🍀 EFFECTS:
    useEffect(() => {
        if (cryptoError) {
            toast.error(cryptoError)
        }
    }, [cryptoError])

    /* Sorting the data based on the sortKey and sortOrder. */
    const sortData = useCallback(() => {
        return [...crypto].sort((a, b) => {
            if (sortOrder === 'ASC') {
                return a[sortKey] > b[sortKey] ? 1 : -1
            } else {
                return a[sortKey] < b[sortKey] ? 1 : -1
            }
        })
    }, [crypto, sortKey, sortOrder])

    /* If the sortKey is the same as the value passed in, then toggle the sortOrder between ASC and DESC. Otherwise, set the sortKey to the value passed in and set the sortOrder to ASC */
    const setSort = (value) => {
        if (sortKey === value) {
            setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
        } else {
            setSortKey(value)
            setSortOrder('ASC')
        }
    }

    // 🍀 RENDER:
    return cryptoLoading ?
        <div
            className="min-w-full min-h-screen flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-50 bg-gray-200">
            <LineWobble size={200} lineWeight={8} speed={2.5} color="black"/>
        </div> :
        <div className="overflow-auto rounded-lg shadow-lg my-5">
            {!cryptoError &&
                <table className="w-full">
                    <thead className="bg-gray-200 bottom-b-2 border-gray-200">
                    <tr className="divide-x divide-gray-300 text-slate-600">
                        <th
                            className="p-3 text-sm font-semibold tracking-wide text-left uppercase cursor-pointer transition-all hover:bg-slate-400 hover:text-white"
                            onClick={() => setSort('id')}
                        >Coin
                        </th>
                        <th
                            className="p-3 text-sm font-semibold tracking-wide text-left uppercase cursor-pointer transition-all hover:bg-slate-400 hover:text-white"
                            onClick={() => setSort('name')}
                        >Name
                        </th>
                        <th
                            className="p-3 text-sm font-semibold tracking-wide text-left uppercase cursor-pointer transition-all hover:bg-slate-400 hover:text-white"
                            onClick={() => setSort('current_price')}
                        >Price
                        </th>
                        <th
                            className="p-3 text-sm font-semibold tracking-wide text-left uppercase cursor-pointer transition-all hover:bg-slate-400 hover:text-white"
                            onClick={() => setSort('price_change_percentage_24h')}
                        >24h
                        </th>
                        <th
                            className="p-3 text-sm font-semibold tracking-wide text-left uppercase cursor-pointer transition-all hover:bg-slate-400 hover:text-white"
                            onClick={() => setSort('total_volume')}
                        >Volume
                        </th>
                        <th
                            className="p-3 text-sm font-semibold tracking-wide text-left uppercase cursor-pointer transition-all hover:bg-slate-400 hover:text-white"
                            onClick={() => setSort('market_cap')}
                        >Mkt Cap
                        </th>
                        <th
                            className="p-3 text-sm font-semibold tracking-wide text-left uppercase cursor-pointer transition-all hover:bg-slate-400 hover:text-white"
                            onClick={() => setSort('price_change_percentage_24h')}
                        >Price Trend
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {/*{[...crypto].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).map(item =>*/}
                    {sortData().map(item =>
                        <tr key={item.id} className="bg-white divide-x divide-gray-200">
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <img className="w-5 h-5 md:w-10 md:h-10" src={item.image} alt={item.name}/>
                                    <Link to={`/coins/${item.id}`}
                                          className="text-blue-500 transition-all hover:text-blue-400">
                                        {item.symbol.toUpperCase()}
                                    </Link>
                                </div>
                            </td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap font-semibold">{item.name}</td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">${item.current_price.toLocaleString()}</td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{item.price_change_percentage_24h.toFixed(2)}%</td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">${item.total_volume.toLocaleString()}</td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">${item.market_cap.toLocaleString()}</td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <span
                                    className={`p-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg ${item.price_change_percentage_24h > 0 ? 'text-green-800 bg-green-200' : 'text-red-800 bg-red-200'}`}>
                                        {item.price_change_percentage_24h > 0 ? 'Upward Trend' : 'Downward Trend'}
                                    </span>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>}
        </div>
}

export default HomePage