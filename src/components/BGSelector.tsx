type ContactProps = {
    current: number;
    set: React.Dispatch<React.SetStateAction<number>>;
}

export const BGSelector: React.FC<ContactProps> = ({ current, set }) => {
    return (
        <section className="background-button-selection">
            <button className={`background-button`} onClick={() => { set(0) }}>
                <div className={`flex w-[100%] h-[100%] ${current == 0 ? 'bg-white' : ''}`} />
            </button>
            <label className="background-button-label">BLANK</label>
            <button className={`background-button`} onClick={() => { set(1) }}>
                <div className={`flex w-[100%] h-[100%] ${current == 1 ? 'bg-white' : ''}`} />
            </button>
            <label className="background-button-label">BASIC</label>
            <button className={`background-button`} onClick={() => { set(2) }}>
                <div className={`flex w-[100%] h-[100%] ${current == 2 ? 'bg-white' : ''}`} />
            </button>
            <label className="background-button-label">DETAILED</label>
        </section>
    );
}