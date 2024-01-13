import React, { useState } from 'react';
import RuleTable from '../comp/RuleTable';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../../../AdminDashboard/comp/AdminHeader';
import AdminSidebar from '../../../AdminDashboard/comp/AdminSidebar';
import ConfiquratorSidebar from '../../../ConfiquratorDashboard/comp/ConfiquratorSidebar';
import {useAuthUser} from "react-auth-kit";

export default function AnalyzationPage(props) {
    const location = useLocation();
    const rules = location.state.data || {}; // Access the 'data' passed from the first page
        debugger
    // console.log("Analyzation page ");
    // console.log(rules);
    const rulesRanks = rules.map(rule => {
        var rank;
        if (rule.rank === 1) {
            rank = 'Low';
        }
        if (rule.rank === 2) {
            rank = 'Medium';
        }
        if (rule.rank === 3) {
            rank = 'High';
        }
        return {...rule, rank: rank};
    });
    console.log(rulesRanks);

    // const rules = [
    //     { rule: 'Error', rank: 'low', date: '15-8-2023', Message: 'jjj' },
    //     { rule: 'Exception', rank: 'Medium', date: '16-8-2023', Message: 'kkk' },
    //     { rule: 'Exception', rank: 'High', date: '15-9-2023', Message: 'lll' },
    //     { rule: 'Error', rank: 'low', date: '10-10-2023', Message: 'mmm' }
    // ];

    const [sortedBy, setSortedBy] = useState(null);

    const handleSortChange = (event) => {
        setSortedBy(event.target.value);
    };

    const sortedRules = rulesRanks.slice().sort((a, b) => {
        if (sortedBy === 'rank') {
            const rankOrder = { low: 1, medium: 2, high: 3 };
            return rankOrder[a.rank.toLowerCase()] - rankOrder[b.rank.toLowerCase()];
        } else if (sortedBy === 'date') {
            return new Date(a.date) - new Date(b.date);
        }
        return 0;
    });
    const auth = useAuthUser()
    const role = auth().role
    return (

        <div className="App">
            {role === "admin" ? <AdminSidebar /> : <ConfiquratorSidebar />}
            <div className="App2">
                {role === "admin" ? (
                    <AdminHeader role="Admin" />
                ) : (
                    <AdminHeader role="Configurator" />
                )}
        <main className="main-content">
          <div className="main-title">
            <h3>Analyze File</h3>
            <br />
          </div>
          <hr />
          <div className='mainP'>
            {rulesRanks && <div>
              <br/>
                <label htmlFor="sortOptions">Sort By: </label>
                <select id="sortOptions" onChange={handleSortChange}>
                    <option value="">None</option>
                    <option value="rank">Rank</option>
                    <option value="date">Date</option>
                </select>
                <div >
                    <RuleTable rules={sortedRules} />
                </div>
            </div>}

        </div>
        </main>
      </div>
    </div>

    
    );
}