package sistema.moeda.studycash.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sistema.moeda.studycash.model.Saldo;

@Repository
public interface SaldoRepository extends JpaRepository<Saldo, String> {
}