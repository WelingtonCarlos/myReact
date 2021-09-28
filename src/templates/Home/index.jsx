import "./styles.css";

import { Component } from "react";
import { loadPosts } from "../../utils/load-posts";
import { Users } from "../../components/Users";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    counter: 0,
    /* posts */ users: [],
    allUsers: [],
    page: 0,
    usersPerPage: 5,
    searchValue: "",
  };

  // data fetching
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    // this.State: chamando o meu estado
    const { page, usersPerPage } = this.state;
    const usersAndPhotos = await loadPosts();

    this.setState({
      /* Array.prototype.slice(): O método slice() retorna uma cópia de parte de um array 
      a partir de um subarray criado entre as posições início e fim (fim não é necessário) 
      de um array original. O Array original não é modificado. */

      users: usersAndPhotos.slice(page, usersPerPage),
      allUsers: usersAndPhotos,
    });
  };

  loadMoreUsers = () => {
    const { page, usersPerPage, allUsers, users } = this.state;
    const nextPage = page + usersPerPage;
    const nextUsers = allUsers.slice(nextPage, nextPage + usersPerPage);

    /* Sintaxe de Espalhamento (Spread syntax) permite que um objeto iterável,
    como uma expressão de array ou uma string seja expandido para ser usado onde
    zero ou mais argumentos (para chamadas de funções) ou elementos (para arrays literais)
    são esperados, ou que um objeto seja expandido onde zero ou mais pares 
    propriedade:valor (para objetos literais) são esperados. */

    users.push(...nextUsers);

    this.setState({ users, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { users, page, usersPerPage, allUsers, searchValue } = this.state;
    const noMoreUsers = page + usersPerPage >= allUsers.length;

    const filteredUsers = !!searchValue
      ? allUsers.filter((user) => {
          return user.name.toLowerCase().includes(searchValue.toLowerCase());
        })
      : users;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Buscar: {searchValue}</h1>}
        </div>

        <TextInput searchValue={searchValue} handleChange={this.handleChange} />

        <br />
        <br />
        <br />

        {filteredUsers.length > 0 && <Users users={filteredUsers} />}
        {filteredUsers.length === 0 && <p>USUÁRIO NÃO ENCONTRADO !!! XD XD</p>}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Carregar mais Usuários!"
              onClick={this.loadMoreUsers}
              disabled={noMoreUsers}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
