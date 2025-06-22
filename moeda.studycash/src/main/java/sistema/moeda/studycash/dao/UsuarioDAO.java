package sistema.moeda.studycash.dao;

import org.springframework.stereotype.Component;
import sistema.moeda.studycash.model.Usuario;
import sistema.moeda.studycash.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Component
public class UsuarioDAO {

    private final UsuarioRepository usuarioRepository;

    public UsuarioDAO(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Optional<Usuario> buscarPorEmailESenha(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha);
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> buscarTodos() {
        return usuarioRepository.findAll();
    }
}
