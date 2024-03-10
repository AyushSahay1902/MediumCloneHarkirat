import React from 'react';

export const Quote = () => {
    return (
        <div className="bg-slate-200 h-screen flex justify-center flex-col">
            <div className="flex justify-center flex-col items-start ml-10 ">
                <div className="max-w-lg font-bold text-2xl">
                    "The customer support i received was exceptional. The team was very responsive and helpful. I would recommend this company to anyone looking for a great experience."
                </div>
                <div className="max-w-md text-center font-semi-bold text-xl mt-4">
                    Julius Winfield
                </div>
                <div className="max-w-md text-center font-semi-bold text-slate-400">
                    Ceo | AcmeCorp
                </div>
            </div>
        </div>
    )
}