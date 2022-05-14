import { useEffect, useState } from "react";
import Model from "./component/modal";

function Dashboard({ data }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortedCol, setSortedCol] = useState("code");
	const [sortedType, setSortedType] = useState("ascending");
	const [coinData, setCoinData] = useState([]);

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		const clonedCoinData = [...data];
		const sortedData = clonedCoinData.sort((coinA, coinB) => {
			if (coinA[sortedCol] > coinB[sortedCol]) {
				return sortedType === "ascending" ? 1 : -1;
			}
			if (coinA[sortedCol] < coinB[sortedCol]) {
				return sortedType === "ascending" ? -1 : 1;
			} else {
				return 0;
			}
		});

		const filteredData = sortedData.filter((data) =>
			data.code.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setCoinData(filteredData);
	}, [sortedCol, sortedType, data, searchTerm]);
	return (
		<div className="max-w-4xl">
			<div className="flex flex-col">
				<div className="overflow-x-auto shadow-md sm:rounded-lg">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden ">
							<div className="flex justify-center">
								<div className="mb-3 xl:w-96">
									<label
										for="exampleFormControlInput1"
										className="form-label inline-block mb-2 text-gray-700"
									></label>
									<input
										className="
                              form-control
                              block
                              w-full
                              px-3
                              py-1.5
                              text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding
                              border border-solid border-gray-300
                              rounded
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            "
										id="exampleFormControlInput1"
										type="text"
										placeholder="Search"
										value={searchTerm}
										onChange={handleChange}
									/>
								</div>
							</div>
							<table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
								<thead className="bg-gray-100 dark:bg-gray-700">
									<tr>
										<th
											scope="col"
											className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
										>
                      <div>
											<button
												classNameName="mx-1"
												type="button"
												onClick={() => {
													setSortedCol("code");
													setSortedType(
														sortedType === "ascending"
															? "descending"
															: "ascending"
													);
												}}
											>
												{sortedType === "ascending" && sortedCol === "code"
													? "Desc"
													: "Asc"}
											</button>
                      </div>
											Code
										</th>
										<th
											scope="col"
											className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
										>
                      <div>
											<button
												classNameName="mx-1"
												type="button"
												onClick={() => {
													setSortedCol("symbol");
													setSortedType(
														sortedType === "ascending"
															? "descending"
															: "ascending"
													);
												}}
											>
												{sortedType === "ascending" && sortedCol === "symbol"
													? "Desc"
													: "Asc"}
											</button>
                      </div>
											Symbol
										</th>
										<th
											scope="col"
											className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
										>
											Rate
										</th>
										<th
											scope="col"
											className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
										>
											Description
										</th>
										<th
											scope="col"
											className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
										>
											Rate Float
										</th>
										<th
											scope="col"
											className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
										>
											Detail View
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
									{coinData.map((item, index) => {
										return (
											<tr
												key={item.code}
												className="hover:bg-gray-100 dark:hover:bg-gray-700"
											>
												<td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{item.code}
												</td>
												<td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
													{item.symbol}
												</td>
												<td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{item.rate}
												</td>
												<td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{item.description}
												</td>
												<td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{item.rate_float}
												</td>
												<Model item={item} />
												<td></td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
