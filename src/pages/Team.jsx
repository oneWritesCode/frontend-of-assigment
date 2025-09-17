import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Team() {
  const { teamName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  console.log(teamName);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      console.log(teamName);

        //TODO: CHECK IF THERE IS TEAM DATA IN LOCAL STORAGE OR NOT.
        //TODO: CHECK IF USER IS IN THE LIST OF TEAM MEMBERS OR NOT

      try {
        const res = await fetch(
          `http://localhost:3000/api/teams/${encodeURIComponent(teamName)}`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch team");
        }
        setTeam(data.team);
        console.log(team);
        setMembers(data.members || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [teamName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 00 to-gray-900 flex items-center justify-center p-8">
        <p className="text-gray-300">Loading team...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 00 to-gray-900 flex items-center justify-center p-8">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 00 to-gray-900 p-4">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 shadow-2xl w-full">
        <div className="ml-6">
          <h1 className="text-2xl font-medium text-gray-100">
            <span className="text-gray-300 tracking-wide">{team?.name}</span>
          </h1>
          {team?.description && (
            <p className="text-gray-400 mt-2 ">{team.description}</p>
          )}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-lg">
            <thead className="bg--600 text-gray-100 font-medium tracking-wider">
              <tr>
                <th className="px-4 text-center py-2">Members</th>
                <th className="px-4 py-2 text-center">
                  Team Code{" "}
                  <span className="text-gray-500 text-xs">
                    {" "}
                    (be careful when sharing)
                  </span>{" "}
                </th>
                <th className="px-4 py-2 text-center">Created By</th>
                <th className="px-4 py-2 text-center">Created At</th>
                <th className="px-4 py-2 text-center">Plan</th>
              </tr>
            </thead>
            <tbody className="bg--800 text-gray-400 font-light tracking-wider">
              <tr className="">
                <td className="px-4 text-center py-2">
                  {members.length}
                </td>
                <td className="px-4 text-center text-red-800 py-2">
                  {team?.team_code}
                </td>
                <td className="px-4 text-center py-2">
                  {team?.created_by || "Unknown"}
                </td>
                <td className="px-4 text-center py-2">
                  {team?.created_at || "—"}
                </td>
                <td className="px-4 text-center py-2">
                  {" "}
                  <span className=" border rounded-2xl border-green-600 px-2 text-green-600">
                    Free
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <p className="text-gray-300 mt-2">Code: {team?.team_code}</p> */}
      </div>
      <div className="w-full flex mt-4 rounded-2xl gap-4">
        <div className="w-full rounded-xl">
          <button className="p-2 bg-gray-300 uppercase rounded-xl m-2 cursor-pointer">
            {" "}
            + add note
          </button>
        </div>
        <div className="w-xl bg-white/5 p-2 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Members</h2>
          <ul className="space-y-2">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex items-center justify-between bg-gray-900/60 border border-gray-700 rounded-md px-4 py-3"
              >
                <div>
                  <p className="text-white font-medium">{member.name}</p>
                  <p className="text-gray-400 text-sm">{member.email}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-200 border border-white/20 uppercase">
                  {member.role}
                </span>
              </li>
            ))}
            {members.length === 0 && (
              <li className="text-gray-400">No members yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Team;
