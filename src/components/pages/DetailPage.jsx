import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {cryptoAsyncThunk} from '../../features/cryptoSlice'
import {LineWobble} from '@uiball/loaders'
import DOMPurify from 'dompurify'
import {toast} from "react-hot-toast";

/**
 * @description DetailPage
 * @returns {JSX.Element}
 * @constructor
 */
const DetailPage = () => {
    // 🍀 HOOKS & VARIABLES:
    const dispatch = useDispatch()
    const {cryptoById, cryptoLoading, cryptoError} = useSelector(({crypto}) => crypto)
    const {id} = useParams()

    // 🍀 EFFECTS:
    useEffect(() => {
        dispatch(cryptoAsyncThunk.fetchCoin(id))

        if (cryptoError) {
            toast.error(cryptoError)
        }
    }, [dispatch, id, cryptoError])

    // 🍀 RENDER:
    return cryptoLoading ?
        <div
            className="min-w-full min-h-screen flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-50 bg-gray-200">
            <LineWobble size={200} lineWeight={8} speed={2.5} color="black"/>
        </div> :
        <>
            {cryptoById ?
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
                    <h1 className="p-4 lg:text-2xl font-semibold text-center border-b-2">About {cryptoById.name}</h1>
                    <div
                        className="relative p-4 pt-6 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 font-semibold">
                        <span
                            className="absolute left-2 -top-3.5 p-1.5 text-xs font-semibold uppercase tracking-wider text-green-800 bg-green-200 rounded-lg">
                            Rank # {cryptoById.market_cap_rank}
                        </span>
                        {cryptoById.image && <img src={cryptoById.image.small} alt={cryptoById.name}/>}
                        {cryptoById.symbol && <p>{cryptoById.symbol.toUpperCase()}/USD</p>}
                        {cryptoById.market_data?.current_price &&
                            <p className="p-1.5 text-2xl tracking-wider text-yellow-800 bg-yellow-200 bg-opacity-40 rounded-lg">
                                ${cryptoById.market_data.current_price.usd.toLocaleString()}
                            </p>}
                    </div>

                    <div className="p-4">
                        <div className="overflow-auto border-2">
                            <table className="w-full">
                                <thead className="bg-gray-200 bottom-b-2 border-gray-200">
                                <tr className="divide-x divide-gray-300">
                                    {['1h', '24h', '7d', '14d', '30d', '1yr'].map((th, index) =>
                                        <th key={index}
                                            className="p-3 text-sm font-semibold tracking-wide text-left uppercase">{th}</th>
                                    )}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                <tr className="bg-white divide-x divide-gray-200">
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {
                                            cryptoById.market_data?.price_change_percentage_1h_in_currency &&
                                            cryptoById.market_data.price_change_percentage_1h_in_currency.usd &&
                                            <p>{cryptoById.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p>
                                        }
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {
                                            cryptoById.market_data?.price_change_percentage_24h_in_currency &&
                                            cryptoById.market_data.price_change_percentage_24h_in_currency.usd &&
                                            <p>{cryptoById.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p>
                                        }
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {
                                            cryptoById.market_data?.price_change_percentage_24h_in_currency &&
                                            cryptoById.market_data.price_change_percentage_7d_in_currency.usd &&
                                            <p>{cryptoById.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p>
                                        }
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {
                                            cryptoById.market_data?.price_change_percentage_24h_in_currency &&
                                            cryptoById.market_data.price_change_percentage_14d_in_currency.usd &&
                                            <p>{cryptoById.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p>
                                        }
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {
                                            cryptoById.market_data?.price_change_percentage_24h_in_currency &&
                                            cryptoById.market_data.price_change_percentage_30d_in_currency.usd &&
                                            <p>{cryptoById.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p>
                                        }
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {
                                            cryptoById.market_data?.price_change_percentage_24h_in_currency &&
                                            cryptoById.market_data.price_change_percentage_1y_in_currency.usd &&
                                            <p>{cryptoById.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p>
                                        }
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="overflow-auto border-2">
                            <table className="w-full">
                                <thead className="bg-gray-200 bottom-b-2 border-gray-200">
                                <tr className="divide-x divide-gray-300">
                                    {['24 Hour Low', '24 Hour High', 'Market Cap', 'Circulating Supply'].map((th, index) =>
                                        <th key={index}
                                            className="p-3 text-sm font-semibold tracking-wide text-left uppercase">{th}</th>
                                    )}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                <tr className="bg-white divide-x divide-gray-200">
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {
                                            cryptoById.market_data?.low_24h &&
                                            <p>${cryptoById.market_data.low_24h.usd.toLocaleString()}</p>
                                        }
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {
                                            cryptoById.market_data?.high_24h &&
                                            <p>${cryptoById.market_data.high_24h.usd.toLocaleString()}</p>
                                        }
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {
                                            cryptoById.market_data?.market_cap &&
                                            <p>${cryptoById.market_data.market_cap.usd.toLocaleString()}</p>
                                        }
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {
                                            cryptoById.market_data &&
                                            <p>{cryptoById.market_data.circulating_supply}</p>
                                        }
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {cryptoById.description && cryptoById.description.en &&
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-1">Description:</h2>
                            <div className="format-html text-sm" dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(cryptoById.description.en),
                            }}/>
                        </div>}
                </div>
                : null
            }
        </>
}

export default DetailPage
