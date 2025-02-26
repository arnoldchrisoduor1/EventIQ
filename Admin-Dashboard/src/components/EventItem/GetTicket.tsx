const GetTicket = () => {
  return (
    <div className="w-[500px] h-[500px] border absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      Ticketing
      <div>
        <select
          className="h-10 w-full border border-slate-300 rounded-md hover:cursor-pointer outline-none"
          name="status"
          // value={formData.status}
          // onChange={handleInputChange}
        >
          <option value="" disabled>
            Ticket Type
          </option>
          <option value="draft">Regular</option>
          <option value="published">VIP</option>
          <option value="cancelled">VVIP</option>
          <option value="postponed">Backstage</option>
        </select>
      </div>
    </div>
  );
};

export default GetTicket;
