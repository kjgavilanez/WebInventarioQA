import 'package:flutter/material.dart';

import '../../../../core/theme/app_theme.dart';
import '../../../../shared/widgets/app_toast.dart';
import '../../../../shared/widgets/confirm_dialog.dart';
import '../../data/repositories/usuario_repository.dart';

Future<void> showUsuarioManagerSheet({
  required BuildContext context,
  required UsuarioRepository repository,
}) async {
  await showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: AppColors.surface,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
    ),
    builder: (ctx) => _UsuarioManagerSheet(repository: repository),
  );
}

class _UsuarioManagerSheet extends StatefulWidget {
  const _UsuarioManagerSheet({required this.repository});
  final UsuarioRepository repository;

  @override
  State<_UsuarioManagerSheet> createState() => _UsuarioManagerSheetState();
}

class _UsuarioManagerSheetState extends State<_UsuarioManagerSheet> {
  List<UsuarioItem> _items = [];
  bool _cargando = true;

  @override
  void initState() {
    super.initState();
    _cargar();
  }

  Future<void> _cargar() async {
    setState(() => _cargando = true);
    try {
      final list = await widget.repository.listar();
      if (!mounted) return;
      setState(() {
        _items = list;
        _cargando = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _cargando = false);
    }
  }

  Future<void> _cambiarRol(UsuarioItem u, String rol) async {
    try {
      await widget.repository.cambiarRol(u.id, rol);
      await _cargar();
      if (!mounted) return;
      showAppToast(context, 'Rol actualizado correctamente');
    } catch (_) {
      if (!mounted) return;
      showAppToast(context, 'Error al cambiar rol', error: true);
    }
  }

  Future<void> _eliminar(UsuarioItem u) async {
    final ok = await showAppConfirmDialog(
      context,
      mensaje: '¿Eliminar este usuario? Esta acción no se puede deshacer.',
    );
    if (!ok) return;
    try {
      await widget.repository.eliminar(u.id);
      await _cargar();
      if (!mounted) return;
      showAppToast(context, 'Usuario eliminado correctamente');
    } catch (_) {
      if (!mounted) return;
      showAppToast(context, 'Error al eliminar usuario', error: true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                const Expanded(
                  child: Text(
                    'Gestionar Usuarios',
                    style: TextStyle(
                      color: AppColors.textPrimary,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.of(context).pop(),
                  icon: const Icon(Icons.close, color: AppColors.textMuted),
                ),
              ],
            ),
            const SizedBox(height: 8),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Usuarios registrados',
                style: TextStyle(color: AppColors.textSecondary, fontSize: 13),
              ),
            ),
            const SizedBox(height: 8),
            Flexible(
              child: _cargando
                  ? const Padding(
                      padding: EdgeInsets.all(20),
                      child: Center(child: CircularProgressIndicator()),
                    )
                  : ListView.separated(
                      shrinkWrap: true,
                      itemCount: _items.length,
                      separatorBuilder: (_, _) => const SizedBox(height: 6),
                      itemBuilder: (_, i) {
                        final u = _items[i];
                        return Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 10,
                          ),
                          decoration: BoxDecoration(
                            color: AppColors.surfaceAlt,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: AppColors.border),
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      u.nombre,
                                      style: const TextStyle(
                                        color: AppColors.textPrimary,
                                        fontSize: 14,
                                      ),
                                    ),
                                    Text(
                                      u.email,
                                      style: const TextStyle(
                                        color: AppColors.textMuted,
                                        fontSize: 12,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(width: 8),
                              DropdownButton<String>(
                                value: u.rol,
                                dropdownColor: AppColors.surface,
                                underline: const SizedBox(),
                                style: TextStyle(
                                  color: u.rol == 'ADMIN'
                                      ? AppColors.primary
                                      : AppColors.success,
                                  fontSize: 12,
                                ),
                                items: const [
                                  DropdownMenuItem(value: 'ADMIN', child: Text('ADMIN')),
                                  DropdownMenuItem(value: 'CLIENTE', child: Text('CLIENTE')),
                                ],
                                onChanged: (v) {
                                  if (v != null && v != u.rol) _cambiarRol(u, v);
                                },
                              ),
                              IconButton(
                                onPressed: () => _eliminar(u),
                                icon: const Text('🗑️', style: TextStyle(fontSize: 16)),
                                color: AppColors.danger,
                              ),
                            ],
                          ),
                        );
                      },
                    ),
            ),
            const SizedBox(height: 8),
            OutlinedButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cerrar'),
            ),
          ],
        ),
      ),
    );
  }
}
