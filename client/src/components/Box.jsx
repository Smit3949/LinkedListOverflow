import React from 'react'

export default function Box() {
    const tags = ['tag1', 'tag2', 'tag3'];

    return (
        <div >
            <div className="Box Box-cur mt-4 p-4 rounded  h-50px w-50px shadow-md border border-black border-opacity-10">
                <div className= " text-lg text-blue-600 box-title">
                    Hello
                </div>
                <div className="box-desc">
                    My name is Smit.
                </div>
                <div className="box-tagcont">
                    {
                        tags.map((tag) => (
                            <div className="box-tag p-1 bg-gray-300 rounded-sm border border-black border-opacity-10 mx-1"> { tag }</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
