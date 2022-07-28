import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/footer";
import { useLoading } from "../../hooks/loadingContext";
import { useUserAuth } from "../../hooks/userAuthContext";

import "./detail.css";

export default function Detail() {
    const { id } = useParams();
    const [squad, setSquad] = useState();

    const { getConf } = useUserAuth();
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        axios.get("/api/all-squad/" + id, getConf()).then((resp) => {
            setLoading(false);
            if (resp.status === 200) {
                setSquad(resp.data);
            }
        });
    }, []);

    return (
        <>
            <div className="bg-detail"></div>
            <div className="bg-black"></div>

            <div className="center-detail smooch">
                <div className="detail-content">
                    <div className="red-line"></div>
                    <div className="detail-squad">
                        <div className="flex center-detail lg-flex">
                            <div className="og-img">
                                <img src="../assets/detail/og.png" alt="" />
                            </div>
                            <div className="og-title">
                                <h1>Achievement</h1>
                                <ul>
                                    {squad
                                        ? squad.achievements.map((e, idx) => {
                                              return (
                                                  <li key={idx}>{e.name}</li>
                                              );
                                          })
                                        : ""}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="center-detail">
                        <div className="detail-short-text">
                            <h1>{squad ? squad.name : ""}</h1>
                            <p>{squad ? squad.description : ""}</p>
                        </div>
                    </div>
                    <div className="center-detail">
                        {squad && squad.squad_members.length !== 0 ? (
                            <div className="board-list">
                                <h1 className="text-xl">Board List</h1>
                                {squad
                                    ? squad.squad_members.map((e, idx) => {
                                          return (
                                              <div
                                                  className="character"
                                                  key={idx}
                                              >
                                                  <div className="flex center-detail sm-flex">
                                                      <img
                                                          className="mr-3"
                                                          src={
                                                              e.photoProfileUrl
                                                          }
                                                          alt=""
                                                      />
                                                      <div>
                                                          <h1>{e.name}</h1>
                                                          <table>
                                                              <tbody>
                                                                  <tr>
                                                                      <td>
                                                                          Email
                                                                      </td>
                                                                      <td>:</td>
                                                                      <td>
                                                                          {
                                                                              e.email
                                                                          }
                                                                      </td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td>
                                                                          DOB
                                                                      </td>
                                                                      <td>:</td>
                                                                      <td>
                                                                          {
                                                                              e.dob
                                                                          }
                                                                      </td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td>
                                                                          Phone
                                                                          No
                                                                      </td>
                                                                      <td>:</td>
                                                                      <td>
                                                                          {
                                                                              e.phone
                                                                          }
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </div>
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : ""}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="center-detail">
                        <div className="other-squad">
                            <h1>Other Squad</h1>
                            <div className="flex sm-flex">
                                <Link
                                    to="/top-squad"
                                    className="other-squad-card"
                                >
                                    <img
                                        src="../assets/detail/beatles.png"
                                        alt=""
                                    />
                                    <h1>Beatles</h1>
                                    <h2>Singapore</h2>
                                </Link>
                                <Link
                                    to="/top-squad"
                                    className="other-squad-card"
                                >
                                    <img
                                        src="../assets/detail/samuraix.png"
                                        alt=""
                                    />
                                    <h1>SamuraiX</h1>
                                    <h2>Thailand</h2>
                                </Link>
                                <Link
                                    to="/top-squad"
                                    className="other-squad-card"
                                >
                                    <img
                                        src="../assets/detail/boom.png"
                                        alt=""
                                    />
                                    <h1>Boom</h1>
                                    <h2>Indonesia</h2>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
}
